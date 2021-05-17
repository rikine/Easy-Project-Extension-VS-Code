import * as vscode from 'vscode';
import { changeExecutable } from './changeExe';
import { createProject } from './createProj';
import { changeDebugOrRelease } from './changeDebugOrRel'

export function activate(context: vscode.ExtensionContext) {
	let createProjectCommand = vscode.commands.registerCommand('easy-project-c--.createProject', createProject);
	let changeNameOfExecutableCommand = vscode.commands.registerCommand('easy-project-c--.changeExecutable', changeExecutable);
	let changeDebugOrReleaseCommand = vscode.commands.registerCommand('easy-project-c--.changeDebugOrRelease', changeDebugOrRelease);

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
}

export function deactivate() { }
