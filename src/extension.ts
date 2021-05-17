import * as vscode from 'vscode';
import { changeExecutable } from './changeExe';
import { createProject } from './createProj';
import { changeDebugOrRelease } from './changeDebugOrRel'
import { allowFoldersInSrc } from './allowFoldersInSrc';

export function activate(context: vscode.ExtensionContext) {
	let createProjectCommand = vscode.commands.registerCommand('easyprojectc.createProject', createProject);
	let changeNameOfExecutableCommand = vscode.commands.registerCommand('easyprojectc.changeExecutable', changeExecutable);
	let changeDebugOrReleaseCommand = vscode.commands.registerCommand('easyprojectc.changeDebugOrRelease', changeDebugOrRelease);
	let allowFoldersInSrcCommand = vscode.commands.registerCommand('easyprojectc.allowFolders', allowFoldersInSrc);


	let buildProjectButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -99);
	buildProjectButton.command = 'workbench.action.tasks.build';
	buildProjectButton.text = '🛠 Build';
	buildProjectButton.show();

	let buildAndRunProjectButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -99);
	buildAndRunProjectButton.command = 'workbench.action.tasks.test';
	buildAndRunProjectButton.text = '🚀 Build -> Run';
	buildAndRunProjectButton.show();

	context.subscriptions.push(createProjectCommand);
	context.subscriptions.push(changeNameOfExecutableCommand);
	context.subscriptions.push(changeDebugOrReleaseCommand);
	context.subscriptions.push(buildProjectButton);
	context.subscriptions.push(buildAndRunProjectButton);
	context.subscriptions.push(allowFoldersInSrcCommand);
}

export function deactivate() { }
