ALTER PROCEDURE pRcvAsk
(
  @FaceCode VARCHAR(10),
  @TranItemNo VARCHAR(20),
  @sMsg VARCHAR(200) OUT
)
AS
    -- 声明
  DECLARE @SerialNo INT
  DECLARE @sDate VARCHAR(10)
  DECLARE @sOrgCode VARCHAR(6)
  DECLARE @sDepCode VARCHAR(10)
  DECLARE @sDepName VARCHAR(20)
  DECLARE @sStr VARCHAR(150)
BEGIN
  SET @SerialNo = 0
  SET @sDate = CONVERT(VARCHAR(10), GETDATE(), 20)  -- 当前日期
  SELECT @sOrgCode = Itemvalue FROM SysCfg WHERE Section = 'SYSTEM' AND ItemName = 'BranchNo' -- 拿到配送中心编码
  SELECT @sDepCode = '000000'
  SELECT @sDepName = DepName FROM Dept WHERE DepCode = @sDepCode  -- 部门编码表中拿到分公司名称

  --判断有无商品 判断4s店的商品经营权限即可
  SELECT @sStr = ''
  SELECT @sStr = COALESCE(@sStr + ',', '') + RTRIM(D.PluCode)  -- 返回非null值
  FROM tDRPInfOrdYhAndThBody D, tDRPInfOrdYhAndThHead H
  -- 当 D和H的订单相同，比较 XsOrgCode 和 配送中心编码 并且 订单类型是 0 的，（0为销售，1为退货）
  WHERE H.BillNo = D.BillNo and H.XsOrgCode = @sOrgCode and D.billtype='0' 
  -- 除外的情况 商品编码在 Goods 中存在在 商品信息表中 或 在商品经营表中且组织编码等于配送中心编码且有经营权限
        AND (NOT EXISTS(SELECT PluCode FROM Goods WHERE PluCode = D.PluCode AND D.BillType = '0')
          OR NOT EXISTS(SELECT PluCode FROM GoodsOrg WHERE D.BillType = '0' AND PluCode = D.PluCode AND OrgCode = @sOrgCode AND IsRight = '1')
            )
  IF @sStr <> ''
  BEGIN
    SET @sMsg = '需先同步商品资料！' + @sStr
    RETURN (-1)
  END

  -- tDRPInfOrdYhAndThHead 与 AskForm 对应的字段及其含义
  -- BillNo 要货单号，BillFrom 要货单来源，DeliverAddr 送货地址，ZkTotal 整单折扣金额，IsOLPromo 是否线上促销，XsOrgCode ？？？
  -- YhOrgCode =OrgCode 分店，@sDepCode =DepCode 部门编码，@sDepName =DepName 部门名称，@sDate =LrDate=RzDate 录入日期入账日期，
  -- YhrCode =UserCode 录入人编码，YhrName =UserName 录入人姓名，Remark 表头备注，CustCode 导航客户，CustPhone 联系电话
  --插入表头
  INSERT INTO AskForm(BillNo, BillFrom, DeliverAddr, ZkTotal, IsOLPromo, XsOrgCode, OrgCode, DepCode, DepName,
                      LrDate, RzDate, State, UserCode, UserName, ZdrCode, ZdrName, Remark, CustCode, CustPhone)
  SELECT BillNo, BillFrom, DeliverAddr, ZkTotal, IsOLPromo, XsOrgCode, YhOrgCode, @sDepCode, @sDepName,
         @sDate, @sDate, '0' AS State, YhrCode, YhrName, YhrCode, YhrName, Remark, CustCode, CustPhone
  FROM tDRPInfOrdYhAndThHead H
  -- 除去 接收数据目录表 老订单 等于 tDRPInfOrdYhAndThHead 内的订单的 
  WHERE NOT EXISTS(SELECT OldBillNo FROM TranJsCatalog WHERE BillType = '04' AND OldBillNo = H.BillNo)
  -- 要货订单 和 H 中 XsOrgCode等于配置中心
        AND BillType = '0' AND XsOrgCode = @sOrgCode
  IF @@ERROR <> 0
  BEGIN
    SET @sMsg = '门店要货单插入单头出错！'
    RETURN (-1)
  END

  -- tDRPInfOrdYhAndThBody 与 AskDetail 对应的字段及其含义
  -- BillNo 要货单号，SerialNo 序号，D.PluCode 商品编码，G.BarCode 条码，G.PluName 商品名称，G.Spec 规格，G.CargoNo 货号
  -- Unit 计量单位，D.Counts =SglCount=Counts 单件件数，D.PriceStatus 价格状态，O.Price 售价，G.JTaxRate 进项税率，x.NetJPrice 无税进价
  -- D.Total 含税进价金额，x.NetCost 无税进价金额，@sDepCode =DepCode 部门编码，@sDepName =DepName 部门名称，D.Remark 标记
  --插入表体
  INSERT INTO AskDetail(BillNo, SerialNo, PluCode, BarCode, PluName, Spec, CargoNo, Unit, SglCount, Counts,
                        PriceStatus, Price, JPrice, JTaxRate, NetJPrice, Cost, NetCost, DepCode, DepName, Remark)
  SELECT BillNo, SerialNo, D.PluCode, G.BarCode, G.PluName, G.Spec, G.CargoNo, Unit, D.Counts, D.Counts,
         D.PriceStatus, O.Price, D.Price, G.JTaxRate, ROUND(D.Price / (1 + ISNULL(G.JTaxRate, 0) / 100.00), 4) AS NetJPrice,
         D.Total, ROUND(D.Total / (1 + G.JTaxRate / 100.00), 2) AS NetCost, @sDepCode, @sDepName, D.Remark
  FROM tDRPInfOrdYhAndThBody D JOIN Goods G ON G.PluCode = D.PluCode
                               JOIN GoodsOrg O ON O.PluCode = D.PluCode AND O.OrgCode = @sOrgCode
  -- 除去 接收数据目录表 BillType 单据类型4？19？ 老订单 等于 tDRPInfOrdYhAndThBody 内的订单的
  WHERE NOT EXISTS(SELECT OldBillNo FROM TranJsCatalog WHERE BillType = '04' AND OldBillNo = D.BillNo)
  -- tDRPInfOrdYhAndThBody 中的 YhOrgCode 要等于 tDRPInfOrdYhAndThHead 中的 YhOrgCode，H 中 XsOrgCode等于配置中心
        AND EXISTS(SELECT * FROM tDRPInfOrdYhAndThHead WHERE BillType = '0' AND D.BillNo = tDRPInfOrdYhAndThHead.BillNo
                                                             AND D.YhOrgCode = tDRPInfOrdYhAndThHead.YhOrgCode
                                                             AND tDRPInfOrdYhAndThHead.XsOrgCode = @sOrgCode)
  IF @@ERROR <> 0
  BEGIN
    SET @sMsg = '门店要货单插入单体出错！'
    RETURN (-1)
  END

  --更新门店要货单单头信息
  UPDATE C
  SET Counts = D.counts,
      Cost = D.Cost,
      NetCost = D.NetCost
  -- tDRPInfOrdYhAndThHead 中 Counts 合计要货数量，Cost 含合计税进价金额，NetCost 合计无税进价金额
  FROM AskForm C,
      (SELECT C.BillNo, SUM(Counts) Counts, SUM(Cost) Cost, SUM(NetCost) NetCost
       FROM AskDetail C JOIN tDRPInfOrdYhAndThHead D ON D.BillNo = C.BillNo
  -- 去除已经存在的
       WHERE NOT EXISTS(SELECT OldBillNo FROM TranJsCatalog WHERE BillType = '04' AND D.BillType = '0' AND OldBillNo = D.BillNo)
       GROUP BY C.BillNo
      ) D
  WHERE C.BillNo = D.BillNo
  IF @@ERROR <> 0
  BEGIN
    SET @sMsg = '门店要货单更新单头信息出错！'
    RETURN (-1)
  END

  -- tDRPInfOrdYhAndThHead 中
  -- YhOrgCode 分店编码
  --更新接收单据目录表
  INSERT INTO TranJsCatalog(OrgCode, BillType, OldBillNo, NewBillNo, JsDate, JsTime, ClDate, ClTime, Remark, FsDate, FsTime)
  SELECT YhOrgCode, '04' AS BillType, BillNo, BillNo, @sDate, CONVERT(VARCHAR(8), GETDATE(), 8) AS JsTime, '', '', '', '', ''
  FROM tDRPInfOrdYhAndThHead D
  -- 去除已经存在的
  WHERE NOT EXISTS(SELECT OldBillNo FROM TranJsCatalog WHERE BillType = '04' AND D.BillType = '0' AND OldBillNo = D.BillNo)
        AND D.XsOrgCode = @sOrgCode
  IF @@ERROR <> 0
  BEGIN
    SET @sMsg='门店要货单插入通讯接收目录数据出错！'
    RETURN (-1)
  END

  -- 删除中间表中的数据，只清除 BillType 为 0 的数据？？？
  DELETE A
  FROM tDRPInfOrdYhAndThBody A, tDRPInfOrdYhAndThHead B
  WHERE A.BillNo = B.BillNo AND A.BillType = B.BillType AND A.YhOrgCode = B.YhOrgCode AND B.BillType = '0' AND B.XsOrgCode = @sOrgCode
  IF @@ERROR <> 0
  BEGIN
    SET @sMsg = '门店要货单删除单体中间表出错！'
    RETURN (-1)
  END

  --清空中间表数据
  DELETE FROM tDRPInfOrdYhAndThHead WHERE BillType = '0' AND XsOrgCode = @sOrgCode
  IF @@ERROR <> 0
  BEGIN
    SET @sMsg = '门店要货单删除单头中间表出错！'
    RETURN (-1)
  END

  RETURN (1)
END