

SELECT COUNT (DISTINCT PluCode) FROM PFSaleDetail WHERE (EXISTS (
SELECT 1 FROM PFSaleForm WHERE PFSaleForm.PFSaleNo =PFSaleDetail.PFSaleNo AND PFSaleForm.RzDate+' '+PFSaleForm.RzTime >='2017-05-01 00:00:00' AND PFSaleForm.RzDate+' '+PFSaleForm.RzTime < '2018-11-01 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM ReturnDetail WHERE (EXISTS (
SELECT 1 FROM ReturnForm WHERE ReturnForm.ReturnNo =ReturnForm.ReturnNo AND ReturnForm.RzDate+' '+ReturnForm.RzTime >='2017-05-01 00:00:00' AND ReturnForm.RzDate+' '+ReturnForm.RzTime < '2018-11-01 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM DifferDetail WHERE (EXISTS (
SELECT 1 FROM DifferForm WHERE DifferForm.DifferNo =DifferForm.DifferNo AND DifferForm.RzDate+' '+DifferForm.RzTime >='2017-05-01 00:00:00' AND DifferForm.RzDate+' '+DifferForm.RzTime < '2018-11-01 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM PFReturnDetail WHERE (EXISTS (
SELECT 1 FROM PFReturnForm WHERE PFReturnForm.PFSaleNo =PFReturnForm.PFSaleNo AND PFReturnForm.RzDate+' '+PFReturnForm.RzTime >='2017-05-01 00:00:00' AND PFReturnForm.RzDate+' '+PFReturnForm.RzTime < '2018-11-01 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM DrawDetail WHERE (EXISTS (
SELECT 1 FROM DrawForm WHERE DrawForm.DrawNo =DrawForm.DrawNo AND DrawForm.RzDate+' 21:00:00'>='2017-05-01 00:00:00' AND DrawForm.RzDate+' 21:00:00'< '2018-11-01 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM OutTransDetail WHERE (EXISTS (
SELECT 1 FROM OutTransForm WHERE OutTransForm.OutTransNo =OutTransForm.OutTransNo AND OutTransForm.RzDate+' 20:00:00'>='2017-05-01 00:00:00' AND OutTransForm.RzDate+' 20:00:00'< '2018-11-01 00:00:00'))
GO