import * as vscode from 'vscode';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { dirname, join, normalize } from 'path';

let __dirnameFixed = normalize(join(dirname(__dirname), '.'));

interface templatesJSON {
	version: string;
	directories?: string[];
	templates: {
		[templateName: string]: {
			files?: {
				[from: string]: string
			};
			openFiles?: [string];
		};
	};
}

const createProject = async () => {
	if (!vscode.workspace.workspaceFolders) {
		vscode.window.showErrorMessage("Easy Project C++: You should open a folder or workspace to create project.");
		return;
	}

	let templates = [];
	try {
		let data = JSON.parse(readFileSync(`${__dirnameFixed}/template/all-files.json`).toString());
		for (let templateName in data.templates) {
			templates.push(templateName);
		}

		const selected = await vscode.window.showQuickPick(templates);
		await checkMultipleWorkspaceAndGetProject(data, selected);
	} catch (error) {
		vscode.window.showErrorMessage(`Easy Project C++: Couldn't get templates.\n${error}`);
	}
};

const checkMultipleWorkspaceAndGetProject = async (data: templatesJSON, templateName: string | undefined) => {
	if (!templateName || !vscode.workspace.workspaceFolders) {
		return;
	}

	if (vscode.workspace.workspaceFolders.length > 1) {
		try {
			const chosen = await vscode.window.showWorkspaceFolderPick();
			if (!chosen) {
				return;
			}
			await getProject(data, templateName, chosen.uri.fsPath);
		} catch (err) {
			vscode.window.showErrorMessage(`Easy Project C++: Found error: ${err}`);
		}
	} else {
		getProject(data, templateName, vscode.workspace.workspaceFolders[0].uri.fsPath);
	}
};

const getProject = async (data: templatesJSON, templateName: string, folder: string) => {
	if (data.directories) {
		data.directories.forEach((dir: string) => {
			if (!existsSync(`${folder}/${dir}`)) {
				mkdirSync(`${folder}/${dir}`);
			}
		});
	}

	let files = data.templates[templateName].files;
	if (files) {
		for (let file in files) {
			try {
				writeFileSync(`${folder}/${files[file]}`, readFileSync(`${__dirnameFixed}/template/${file}`).toString());
			} catch (error) {
				vscode.window.showErrorMessage(`Easy Project C++: Found error: Can't get file: '${file}'.\n${error}`);
			}
		}
	}

	let openFiles = data.templates[templateName].openFiles;
	if (openFiles) {
		if (existsSync(`${folder}/${openFiles[0]}`)) {
			vscode.workspace.openTextDocument(`${folder}/${openFiles[0]}`)
				.then(doc => vscode.window.showTextDocument(doc, { preview: false }));
		}
	}
};

const changeExecutable = async () => {
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

export function activate(context: vscode.ExtensionContext) {
	let createProjectCommand = vscode.commands.registerCommand('easy-project-c--.createProject', createProject);
	let changeNameOfExecutable = vscode.commands.registerCommand('easy-project-c--.changeExecutable', changeExecutable);
	context.subscriptions.push(createProjectCommand);
	context.subscriptions.push(changeNameOfExecutable);
}

export function deactivate() { }
