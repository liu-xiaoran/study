@echo off
set DestPath=G:\zhangyue143\development\html\xiaomiapp\xmapp\src
for /r %DestPath% %%i in (.) do (
echo %%i
cd %%i
ren *.mix *.ux
)
pause