SELECT COUNT (DISTINCT PluCode) FROM DifferDetail WHERE (EXISTS (
SELECT 1 FROM DifferForm WHERE DifferForm.DifferNo =DifferForm.DifferNo AND DifferForm.RzDate+' '+DifferForm.RzTime >='2018-11-09 00:00:00' AND DifferForm.RzDate+' '+DifferForm.RzTime < '2018-11-10 00:00:00')) 