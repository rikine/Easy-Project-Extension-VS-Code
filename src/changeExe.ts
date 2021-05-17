import * as vscode from 'vscode';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

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
        } catch (error) {
            vscode.window.showErrorMessage(`Easy Project C++: Couldn't change name of Executable.\n${error}`);
        }
    } else {
        await changeNameOfExecutable(nameOfExe, vscode.workspace.workspaceFolders[0].uri);
    }
    vscode.window.showInformationMessage("Easy Project C++: Name of executable was changed to " + nameOfExe);
};

const changeNameOfExecutable = async (nameOfExe: string, workspaceFolder: vscode.Uri) => {
    if (existsSync(join(workspaceFolder.fsPath, ".vscode", "launch.json"))) {
        nameOfExe = nameOfExe.trim();
        const launchConfigs: any = vscode.workspace.getConfiguration('launch', workspaceFolder).get("configurations");
        launchConfigs[0]["program"] = "${workspaceFolder}/bin/" + nameOfExe;
        vscode.workspace.getConfiguration('launch', workspaceFolder).update("configurations", launchConfigs);
    }
    if (existsSync(join(workspaceFolder.fsPath, "Makefile"))) {
        let makeFile = readFileSync(join(workspaceFolder.fsPath, "Makefile")).toString();
        makeFile = makeFile.replace(new RegExp("EXECUTABLE\\s*\:=\\s*.*", "g"), "EXECUTABLE	:= " + nameOfExe);
        writeFileSync(join(workspaceFolder.fsPath, "Makefile"), makeFile);
    }
};