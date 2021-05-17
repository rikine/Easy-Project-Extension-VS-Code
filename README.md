Easy-Project-Extension-VS-Code
==============================

This is an extension to create a project in VS Code for C++ for all popular platforms
-------------------------------------------------------------------------------------

### Requirements

*   You should install [C++ VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) to get all features from C++  
    Or you can run this command from the command palette: ext install ms-vscode.cpptools
*   Mac OS with installed XCode or Developer Tools and [Native debugger based on LLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)  
    You can download it with: xcode-select --install
*   Linux with installed g++ make gdb.  
    You can download it with: sudo apt-get install g++ make gdb
*   Windows with installed powershell, MinGW(g++, gdb) and make or WSL  
    If you use powershell, you should add make to powershell with for example "Set-Alias make C:\\msys64\\usr\\bin\\make.exe"  
    You can download make with MinGW here: [MSYS2](https://www.msys2.org/)

### How to use?

To **create a project** you should open a folder or workspace, enter ctrl + shift + p, type "Easy Project" and choose "Create Project". After that choose your platform and code!

To **change the executable name** you should should open a folder or workspace with a project, enter ctrl + shift + p, type "Easy Project" and choose "Change name of executable". After that type a new name (without any .exe) and done!

To **get the release or debug version** of the executable you should should open a folder or workspace with a project, enter ctrl + shift + p, type "Easy Project" and choose "Set debug or release version". After that choose what you need and done!

### Additionally

You can use any compiler but should change one line in Makefile.