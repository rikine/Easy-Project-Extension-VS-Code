import * as vscode from 'vscode';
import { changeExecutable } from './changeExe';
import { createProject } from './createProj';
import { changeDebugOrRelease } from './changeDebugOrRel'

export function activate(context: vscode.ExtensionContext) {
	let createProjectCommand = vscode.commands.registerCommand('easy-project-c--.createProject', createProject);
	let changeNameOfExecutableCommand = vscode.commands.registerCommand('easy-project-c--.changeExecutable', changeExecutable);
	let changeDebugOrReleaseCommand = vscode.commands.registerCommand('easy-project-c--.changeDebugOrRelease', changeDebugOrRelease);
	context.subscriptions.push(createProjectCommand);
	context.subscriptions.push(changeNameOfExecutableCommand);
	context.subscriptions.push(changeDebugOrReleaseCommand);
}

export function deactivate() { }
