<h1>Easy-Project-Extension-VS-Code</h1>
<h2> This is an extension to create a project in VS Code for C++ for all popular platforms </h2>

<main>
  <article>
    <strong>Requirements</strong>
    <ul>
      <li>
        Mac OS with installed XCode or Developer Tools.
        <br>
        You can download it with: xcode-select --install
      </li>
      <li>
        Linux with installed g++.
        <br>
        You can download it with: sudo apt-get install g++ make gdb
      </li>
      <li>
        Windows with installed powershell, MinGW(g++) and make or WSL
        <br>
        If you use powershell, you should add make to powershell with for example "Set-Alias make C:\msys64\usr\bin\make.exe"
        <br>
        You can download make with MinGW here: <a href="https://www.msys2.org/">MSYS2</a>
      </li>
    </ul>
  </article>
 <article>
  <strong>
    How to use?
  </strong>
  <p>
    To create a project you should open a folder or workspace, enter ctrl + shift + p, type "Easy Project" and choose "Create Project". After that choose your platform and code!
  </p>
  <p>
    To change the executable name you should should open a folder or workspace with a project, enter ctrl + shift + p, type "Easy Project" and choose "Change name of executable". After that type a new name and done!
  </p>
  <p>
    To get the release or debug version of the executable you should should open a folder or workspace with a project, enter ctrl + shift + p, type "Easy Project" and choose "Set debug or release version". After that choose what you need and done!
  </p>
 </article>
 <article>
   <strong>
    Additionally
   </strong>
   <p>
    You can use any compiler but should change one line in Makefile.
   </p>
 </article>
</main>
