
USE sysdb_sh02
GO
SELECT COUNT (DISTINCT PluCode) FROM PFSaleDetail WHERE (EXISTS (
SELECT 1 FROM PFSaleForm WHERE PFSaleForm.PFSaleNo =PFSaleDetail.PFSaleNo AND PFSaleForm.RzDate+' '+PFSaleForm.RzTime >='2018-11-09 00:00:00' AND PFSaleForm.RzDate+' '+PFSaleForm.RzTime < '2018-11-10 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM ReturnDetail WHERE (EXISTS (
SELECT 1 FROM ReturnForm WHERE ReturnForm.ReturnNo =ReturnDetail.ReturnNo AND ReturnForm.RzDate+' '+ReturnForm.RzTime >='2018-11-09 00:00:00' AND ReturnForm.RzDate+' '+ReturnForm.RzTime < '2018-11-10 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM DifferDetail WHERE (EXISTS (
SELECT 1 FROM DifferForm WHERE DifferForm.DifferNo =DifferDetail.DifferNo AND DifferForm.RzDate+' '+DifferForm.RzTime >='2018-11-09 00:00:00' AND DifferForm.RzDate+' '+DifferForm.RzTime < '2018-11-10 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM PFReturnDetail WHERE (EXISTS (
SELECT 1 FROM PFReturnForm WHERE PFReturnForm.PFReturnNo =PFReturnDetail.PFReturnNo AND PFReturnForm.RzDate+' '+PFReturnForm.RzTime >='2018-11-09 00:00:00' AND PFReturnForm.RzDate+' '+PFReturnForm.RzTime < '2018-11-10 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM DrawDetail WHERE (EXISTS (
SELECT 1 FROM DrawForm WHERE DrawForm.DrawNo =DrawDetail.DrawNo AND DrawForm.RzDate+' 20:00:00'>='2018-11-09 00:00:00' AND DrawForm.RzDate+' 20:00:00'< '2018-11-10 00:00:00')) 
SELECT COUNT (DISTINCT PluCode) FROM OutTransDetail WHERE (EXISTS (
SELECT 1 FROM OutTransForm WHERE OutTransForm.OutTransNo =OutTransDetail.OutTransNo AND OutTransForm.RzDate+' 20:00:00'>='2018-11-09 00:00:00' AND OutTransForm.RzDate+' 20:00:00'< '2018-11-10 00:00:00'))
GO