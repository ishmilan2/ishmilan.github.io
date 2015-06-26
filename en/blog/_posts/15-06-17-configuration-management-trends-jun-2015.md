---
layout: post_en
title: Configuration Management - Trends Jun 2015
---

**_Trends_** in **_Software Configuration Management discipline_** allow you to focus and redefine the **_standards_** set so far in **_working environments_**.

### Introduction
The **_process of Software Configuration Management (SCM)_** should ensure the conditions for software development easy. A good definition of **_SCM_** process enables developers to work together and efficiently. The process includes tools, patterns and standards of use for **_SCM_** properly defined.

This paper shows the status of some tools that support the **_SCM_** from the data obtained from the following sources: <a href="https://www.google.com/trends/explore" target="_blank">Google Trends</a> and <a href="http://stackoverflow.com/" target="_blank">StackOverflow</a>.

**_The tools tested_** were selected from my experience working as a **_Software Configuration Manager_**. New tools may be included later.

## Software Configuration Management Activities

The classic definition of activities described by **_Roger S. Presman_** in his book **_"Ingeniería de Software: Un enfoque práctico"_** are:

* Configuration idnetification
* Change control
* Status accounting
* Configuration audit

A little more recent, the author Bob Aiello presents in his book **_"Configuration Management Best Practices"_** the following activities:

* Source code management
* Build engineering
* Environment configuration
* Change control
* Release engineering
* Deployment

Both definitions are correct in my opinion, each with its own focus. During this brief definitions **_Bob Aiello_** will be used to display the tools analyzed according to their activity.

## 1. Source code management
### 1.1 Version control system
**_Systems analyzed:_**
<a target="_blank" href="https://subversion.apache.org/">Subversion</a>, <a href="https://git-scm.com/" target="_blank">Git</a>, <a href="https://mercurial.selenic.com/" target="_blank">Mercurial</a>, <a href="http://www.nongnu.org/cvs/" target="_blank">CVS</a>.

<img src="{{ site.baseurl }}/images/150619/subversion-mercurial-git-cvs.png" title="Sistemas de control de versiones - Google Trends" name="Sistemas de control de versiones - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-versioncontrol-systems.png" title="Sistemas de control de versiones - StackOverflow" name="Sistemas de control de versiones - StackOverflow" />

**_Git_** shows a greater number of registration in both graphs. These values reflect the popularity and acceptance of this system of version control. Among the main features of this system is the integrity of information and speed.

### 1.2 Control Roles and Users
**_Git_** is a version control system most used according to revised charts. Git not established within their capabilities for managing roles and user permissions. Therefore these tools are adopted to ensure safety in source code repositories.

**_Tools analyzed:_**
<a href="https://wiki.archlinux.org/index.php/Gitosis" target="_blank">Gitosis</a>, <a href="http://gitolite.com/gitolite/index.html" target="_blank">Gitolite</a>.

<img src="{{ site.baseurl }}/images/150619/gitolite-gitosis.png" title="Gitolite-Gitosis - Google Trends" name="Gitolite-Gitosis - Google Trends" /> <img src="{{ site.baseurl }}/images/150619/stackoverflow-gitolite-gitosis.png" title="Gitolite-Gitosis - StackOverflow" name="Gitolite-Gitosis - StackOverflow" />

**_Gitolite_** has the greatest records to perform the analysis. The high level of granularity of this system makes it a powerful tool when you want to establish the safety of source code repositories.

### 1.3 Flujo de Trabajo
**_Git-flow_** provides the recommended methodology using **_Git_**. The work flow smoothly adapts to different teams and projects regardless of size or location. For more information flow should be checked the <a target="_blank" href="http://nvie.com/posts/a-successful-git-branching-model/">following link</a>:
<img src="{{ site.baseurl }}/images/150619/git-flow.png" title="Git-Flow" name="Git-Flow" />

### 1.4 GUI tools
**_GUI tools analyzed:_**

Visual tools help to manage the source code to ensure high levels of usability in relation to the **_Git_** system. These tools allow all users to use simple form the benefits provided by the version control system. Similarly improves the process of integration into the team.

* <a href="https://windows.github.com/" target="_blank">GitHub for Windows</a> from GitHub.
* <a href="https://mac.github.com/" target="_blank">GitHub for Mac OS X</a> from GitHub.
* <a href="https://www.sourcetreeapp.com/" target="_blank">SourceTree</a> from Atlassian.
* <a href="http://www.gitboxapp.com/" target="_blank">Gitbox</a>
* <a href="http://www.git-tower.com/" target="_blank">Tower</a> used by Google, Apple, Salesforce, Adobe, Amazon, Ebay, Yahoo ...
* <a href="http://www.git-tower.com/" target="_blank">SmartGit</a>
* <a href="http://git-cola.github.io/" target="_blank">Git-cola</a>
* <a href="http://www.collab.net/products/giteye" target="_blank">GitEye</a>
* <a href="http://www.gittiapp.com/" target="_blank">Gitti</a>
* <a href="http://rowanj.github.io/gitx/" target="_blank">GitX-dev</a>

**_Tower_** and **_SourceTree_** are the tools that I recommend. The main features that give weight to my decision are: 

* User interface friendly and intuitive.
* **_Git-Flow_** integration as proposed workflow.
* Integration with external systems and execute scripts.

**_Reference sites reviewed during the search:_** <a href="http://www.freshtechtips.com/2015/03/git-client-windows-mac-linux.html" target="_blank">10 Reference sites</a>, <a href="http://www.slant.co/topics/465/~what-are-the-best-git-clients-for-mac-os-x" target="_blank">Clientes para Mac OS X</a>.

## 2 Build engineering

### 2.1 Build tools
Construction tools allow agencies to organize and implement the necessary measures to achieve create the final software product tasks.

**_Tools analyzed:_**
<a href="http://www.gnu.org/software/make/" target="_blank">Make</a>, <a href="http://ant.apache.org/" target="_blank">Ant</a>, <a href="http://www.scons.org/" target="_blank">Scons</a>, <a href="http://www.cmake.org/" target="_blank">CMake</a>, <a href="https://maven.apache.org/" target="_blank">Maven</a>, <a href="https://gradle.org/" target="_blank">Gradle</a>.

<img src="{{ site.baseurl }}/images/150619/make-ant-maven.png" title="Sistemas de Construcción - Google Trends" name="Sistemas de Construcción - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-buildtools.png" title="Sistemas de Construcción - StackOverflow" name="Sistemas de Construcción - StackOverflow" />

**_Maven_** has for some time with the highest popularity. Figures are largely given the ability to model, simply, the logic to be constructed. As a suggestion recommend not to lose sight of **_Gradle_**. This tool has been adopted by teams like Eclipse to make their buildings.

## 3 Environment configuration

This area of the project depends heavily used and the characteristics of each development group. Therefore it has not been performed the same analysis would at rest.

In general the intention is to establish the same scenario: _pogramadores machines, test servers and servers end product_. Each scenario should be configured the same packages, dependencies and applications in order to avoid errors during the testing and deployment.

As recommended elements 2 systems that help standardize and share settings work environments quickly and reliably shown: <a href="https://www.docker.com/">Docker</a> y <a href="https://www.vagrantup.com/">Vagrant</a>.

<img src="{{ site.baseurl }}/images/150619/docker-vagrant.png" title="Docker-Vagrant - Google Trends" name="Docker-Vagrant - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-docker-vagrant.png" title="Docker-Vagrant - StackOverflow" name="Docker-Vagrant - StackOverflow" />

**_Docker_** shows higher rates in the charts analyzed. _Docker_ is still a version control system to operating system level. _Docker_ uses the philosophy of _Git_ but at a lower level. If you like _Git_ I sure would like to take _Docker_. I give it a vistaso recommend this tool.

## 4 Change control
### 4.1 Projects management
In this area we have analyzed the project management systems.

**_Tools analyzed:_**
<a href="http://www.redmine.org/" target="_blank">Redmine</a>, <a href="https://www.atlassian.com/software/jira" target="_blank">Jira</a>, <a href="https://www.mantisbt.org/" target="_blank">Mantis BT</a>, <a href="http://trac.edgewall.org/" target="_blank">Trac</a>.

<img src="{{ site.baseurl }}/images/150619/redmine-jira-mantis-trac.png" name="Control de Cambios - Google Trends" title="Control de Cambios - Google Trends" />
<img src="{{ site.baseurl }}/images/150619/stackoverflow-jira-redmine-mantis-trac.png" name="Control de Cambios - StackOverflow" title="Control de Cambios - StackOverflow" />

**_Jira_** and **_Redmine_** show higher levels in the analyzed graphs, both systems have excellent features. In my personal experience working with very good adaptation _Redmine_ identify (through plugins) with the rest of the systems mentioned in the article.

## 5 Release engineering
### 5.1 Continuous systems integration
Continuous integration systems allow, among other activities, executing the following tasks: Night buildings, integration testing, documentation generation, statistical code analysis, reporting.

**_Tools analyzed:_**
<a href="http://hudson-ci.org/" target="_blank">Hudson</a>, <a href="https://jenkins-ci.org/" target="_blank">Jenkins</a>, <a href="https://www.atlassian.com/software/bamboo" target="_blank">Atlassian Bamboo</a>.

<img src="{{ site.baseurl }}/images/150619/hudson-jenkins-bamboo.png" title="Integración continua - Google Trends" name="Integración continua - Google Trends" /><img src="{{ site.baseurl }}/images/150619/stackoverflow-ci-systems.png" title="Integración continua - StackOverflow" name="Integración continua - StackOverflow" />

**_Jenkins_** shows the largest number of activities in the graphs. This how much system with numerous plugins that allow integrating external systems.

## 6 Deployment
The deployment of the systems can be carried out manually, semi-automatic or fully automatic. Automatic displays frequently are performed using continuous integration tools as described in the previous section.

Given the trends seen before _(Git, SourceTree, Git-Flow)_ recommend for semi-automatic variants <a href="https://github.com/git-ftp/git-ftp" target="_blank">Git-FTP</a>.

Manual deployment variants are made using classic FTP clients such as <a href="https://filezilla-project.org/" target="_blank">FileZila</a>. 

### Final Reflections

Trends in the **_SCM_** provide an insight into the behavior of the methods, tools and patterns. In this paper is shown in greater detail the tools used in this process.

The highly relevant elements identified in the study allow us to establish a favorable environment for the development of software. **_Collaboration and communication_** between them is vital to the success of the group.

The working groups should make the selection of tools for your environment because the variants are many. However, keep in mind you are graphs during **_the selection of tools for software development environment_** will help raise **_productivity levels_** and **_reduce errors_**.

### Significant Revisions
* SHRIKRISHNA, H. (2015): Orchestrating Docker.
* JOHN, F. (2012): Jenkins The Definitive Guide.
* BOB, A. (2011): Configuration Management Best Practices. Practical Methods that work in the real world. Addison-Wesly.
* PETER, S (2011): Software Build Systems. Principles and Experience. Addison-Wesly.
* PAUL, M. (2007): Continuous Integration. Improving Software Quality
and Reducing Risk
* ROGER, S. P. (2005): Ingeniería de Software. Un enfoque práctico.
* STEVE, B. (2002): Software Configuration Patterns: Effective Teamwork, Practical Integration. Addison-Wesly.