import * as vscode from 'vscode';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as os from 'os';

export const changeExecutable = async () => {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("Easy Project C++: You should open a folder or workspace with Easy Project to change Executable.");
        return;
    }

    const nameOfExe = await vscode.window.showInputBox({ prompt: `Enter name of Executable` });
    if (!nameOfExe || !vscode.window.activeTextEditor) {
        return;
    }

    if (vscode.workspace.workspaceFolders.length > 1) {
        try {
            const chosen = await vscode.window.showWorkspaceFolderPick();
            if (!chosen) {
                return;
            }
            await changeNameOfExecutable(nameOfExe, chosen.uri);
            vscode.window.showInformationMessage("Easy Project C++: Name of executable was changed to " + nameOfExe);
        } catch (error) {
            vscode.window.showErrorMessage(`Easy Project C++: Couldn't change name of Executable.\n${error}`);
        }
    } else {
        await changeNameOfExecutable(nameOfExe, vscode.workspace.workspaceFolders[0].uri);
    }
};

const changeNameOfExecutable = async (nameOfExe: string, workspaceFolder: vscode.Uri) => {
    if (existsSync(join(workspaceFolder.fsPath, ".vscode", "launch.json"))) {
        nameOfExe = nameOfExe.trim();
        if (os.type() == "Windows_NT") {
            nameOfExe = nameOfExe + ".exe";
        }
        // const launchConfigs: any = vscode.workspace.getConfiguration('launch', workspaceFolder).get("configurations");
        // launchConfigs[0]["program"] = "${workspaceFolder}/bin/" + nameOfExe;
        // vscode.workspace.getConfiguration('launch', workspaceFolder).update("configurations", launchConfigs);
        let data = JSON.parse(readFileSync(join(workspaceFolder.fsPath, ".vscode", "launch.json")).toString());
        data["configurations"][0]["program"] = "${workspaceFolder}/bin/" + nameOfExe;
        writeFileSync(join(workspaceFolder.fsPath, ".vscode", "launch.json"), JSON.stringify(data, null, '\t'));
    }
    if (existsSync(join(workspaceFolder.fsPath, "Makefile"))) {
        let makeFile = readFileSync(join(workspaceFolder.fsPath, "Makefile")).toString();
        makeFile = makeFile.replace(new RegExp("EXECUTABLE\\s*\:=\\s*.*", "g"), "EXECUTABLE	:= " + nameOfExe);
        writeFileSync(join(workspaceFolder.fsPath, "Makefile"), makeFile);
    }
};