#!/usr/bin/env node
// create命令的所有逻辑 
// create的功能是 创建项目
// author: yfm


const inquirer = require('inquirer');
const {
    fnLoadingByOra,
    fetchReopLists,
    getTagLists,
    downDir,
    copyTempToLoclhost,
    getChoiceContent,
    mapRepoInfo,
    mapActions
} = require('./utils/common');
const program = require('commander');
const chalk = require('chalk');
const fse = require('fs-extra');
    
module.exports =  async (projectName) => {
    if (!projectName) {
        program.help();
        return;
    } 
   
   let { defaultRepo } = await inquirer.prompt([{
        type: 'confirm',
        name: 'defaultRepo',
        message: '你是否下载默认地址项目?\n ',
        default: true
    }])
    // .then((answers) => {  yes回调
    //     console.log('结果为:')
    //     console.log(answers)
    //   });
    if (!defaultRepo) {
        console.log(`您还可以通过config命令lee-cli config set <k> <v>来设置选择你要gitHub地址上下载项目，具体案例如下：\n`);
        console.log(`执行${chalk.green('lee-cli config set org lxy-cli')}`);
        return;
    }
   const repo = await getChoiceContent(fetchReopLists, mapRepoInfo.repos.mess, mapRepoInfo.repos.promptObj);
   if (!repo) {       
        return;
   }
    // 获取版本信息
    // const tag = await getChoiceContent(getTagLists, mapRepoInfo.tags.mess, mapRepoInfo.tags.promptObj,repo);
    // if (!tag) {
    //     return;
    // }


    // 下载项目到临时文件夹 \Users\yfm\myTemplate macos
    const {dest,filePath} = await fnLoadingByOra(downDir, '下载项目中...')(repo);
    // const {dest,filePath} = await fnLoadingByOra(downDir, '下载项目中...')(repo, tag);
    copyTempToLoclhost(filePath, projectName);
    // fse.remove(filePath);
    // const result = await fnLoadingByOra(copyTempToLoclhost, '复制项目到当前工作目录...')(filePath, projectName);

}