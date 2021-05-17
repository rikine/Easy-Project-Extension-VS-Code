import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as vscode from 'vscode';

export const changeDebugOrRelease = async () => {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("Easy Project C++: You should open a folder or workspace with Easy Project to change Executable.");
        return;
    }

    let templates = ["Release", "Debug"];
    const selected = await vscode.window.showQuickPick(templates);
    if (!selected) {
        return;
    }
    let Argument: string;
    if (selected == "Release") {
        Argument = "FALSE";
    }
    else {
        Argument = "TRUE";
    }
    try {
        if (vscode.workspace.workspaceFolders.length > 1) {
            const chosen = await vscode.window.showWorkspaceFolderPick();
            if (!chosen) {
                return;
            }
            await setDebugOrRelease(Argument, chosen.uri);
        } else {
            await setDebugOrRelease(Argument, vscode.workspace.workspaceFolders[0].uri);
        }
        vscode.window.showInformationMessage("Easy Project C++: Configuration was changed to " + selected);
    } catch (error) {
        vscode.window.showErrorMessage(`Easy Project C++: Couldn't set debug or release.\n${error}`);
    }
};

const setDebugOrRelease = async (Argument: string, workspaceFolder: vscode.Uri) => {
    if (existsSync(join(workspaceFolder.fsPath, ".vscode", "tasks.json"))) {
        let data = JSON.parse(readFileSync(join(workspaceFolder.fsPath, ".vscode", "tasks.json")).toString());
        for (let task in data["tasks"]) {
            data["tasks"][task]["args"][0] = "DEBUG=" + Argument;
        }
        writeFileSync(join(workspaceFolder.fsPath, ".vscode", "tasks.json"), JSON.stringify(data, null, '\t'));
    }

    // const tasksConfigs: any = vscode.workspace.getConfiguration('tasks', workspaceFolder).get("tasks");
    // for (let task in tasksConfigs) {
    //     tasksConfigs[task]["args"][0] = "DEBUG=" + Argument;
    //     vscode.workspace.getConfiguration('tasks', workspaceFolder).update("tasks", tasksConfigs);
    // }
}