' start_reader.vbs – jalankan server Node + buka index.html tanpa CMD

Dim fso, folderPath, shell

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = fso.GetParentFolderName(WScript.ScriptFullName)

Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = folderPath

' Jalankan server Node dalam mode hidden (0 = hidden window)
shell.Run "node app.cjs", 0, False

' Buka index.html secara normal (1 = normal window)
shell.Run "index.html", 1, False