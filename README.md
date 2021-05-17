<h1>Easy-Project-Extension-VS-Code</h1>
<h2> This is an extension to create a project in VS Code for C++ for all popular platforms </h2>

<main>
  <article>
    <h3>Requirements</h3>
    <ul>
      <li>
        You should install <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools">C++ VSCode extension</a> to get all features from C++
        <br>
        Or you can run this command from the command palette: ext install ms-vscode.cpptools
      </li>
      <li>
        Mac OS with installed XCode or Developer Tools and <a href="https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb">Native debugger based on LLDB</a>
        <br>
        You can download it with: xcode-select --install
      </li>
      <li>
        Linux with installed g++ make gdb.
        <br>
        You can download it with: sudo apt-get install g++ make gdb
      </li>
      <li>
        Windows with installed powershell, MinGW(g++, gdb) and make or WSL
        <br>
        If you use powershell, you should add make to powershell with for example "Set-Alias make C:\msys64\usr\bin\make.exe"
        <br>
        You can download make with MinGW here: <a href="https://www.msys2.org/">MSYS2</a>
      </li>
    </ul>
  </article>
 <article>
  <h3>
    How to use?
  </h3>
  <p>
    To <strong>create a project</strong> you should open a folder or workspace, enter ctrl + shift + p, type "Easy Project" and choose "Create Project". After that choose your platform and code!
  </p>
  <p>
    To <strong>change the executable name</strong> you should should open a folder or workspace with a project, enter ctrl + shift + p, type "Easy Project" and choose "Change name of executable". After that type a new name (without any .exe) and done!
  </p>
  <p>
    To <strong>get the release or debug version</strong> of the executable you should should open a folder or workspace with a project, enter ctrl + shift + p, type "Easy Project" and choose "Set debug or release version". After that choose what you need and done!
  </p>
 </article>
 <article>
   <h3>
    Additionally
   </h3>
   <p>
    You can use any compiler but should change one line in Makefile.
   </p>
 </article>
</main>
