import * as vscode from 'vscode';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { dirname, join, normalize } from 'path';

export const allowFoldersInSrc = async () => {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("Easy Project C++: You should open a folder or workspace with project to allow folders in src.");
        return;
    }

    let templates = ["MultiFolders", "Single Folder"];
    try {
        const selected = await vscode.window.showQuickPick(templates);
        if (!selected) {
            return;
        }
        if (vscode.workspace.workspaceFolders.length > 1) {
            const chosen = await vscode.window.showWorkspaceFolderPick();
            if (!chosen) {
                return;
            }
            await changeMakeFileForFolders(selected, chosen.uri);
        } else {
            await changeMakeFileForFolders(selected, vscode.workspace.workspaceFolders[0].uri);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Easy Project C++: Makefile should contain at least $(BIN)/$(EXECUTABLE): $(SRC)/*.cpp to make something. Error.\n${error}`);
    }
};

const changeMakeFileForFolders = async (selected: string, workspaceFolder: vscode.Uri) => {
    if (existsSync(join(workspaceFolder.fsPath, "Makefile"))) {
        let makeFile = readFileSync(join(workspaceFolder.fsPath, "Makefile")).toString();
        if (selected == "MultiFolders") {
            makeFile = makeFile.replace("$(BIN)/$(EXECUTABLE): $(SRC)/*.cpp", "$(BIN)/$(EXECUTABLE): $(SRC)/*.cpp $(SRC)/**/*.cpp");
        }
        else {
            makeFile = makeFile.replace("$(BIN)/$(EXECUTABLE): $(SRC)/*.cpp $(SRC)/**/*.cpp", "$(BIN)/$(EXECUTABLE): $(SRC)/*.cpp");
        }
        writeFileSync(join(workspaceFolder.fsPath, "Makefile"), makeFile);
    }
};