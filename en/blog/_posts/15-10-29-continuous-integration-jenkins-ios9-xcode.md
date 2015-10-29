---
layout: post_en
title: Continuous integration mixing Jenkins, iOS 9 and XCode 7.
permalink: /en/blog/continuous-integration-jenkins-ios9-xcode/
translate_es: /blog/integracion-continua-jenkins-ios9-xcode/
category: [article]
tags: [jenkins, xcode, ios9]
image: /images/banners/jenkins-og.jpeg
excerpt: <strong><em>Automate testing for iOS 9 projects is possible!!!</em></strong> Delegating the execution of test cases to higher-performance machines <strong><em>simplifies the development process</em></strong>.
---

<img src="{{ site.baseurl }}/images/banners/jenkins-ios9.png" title="Jenkins, XCode 7 y iOS 9" name="Jenkins, XCode 7 y iOS 9" />

### Introduction

The execution of **_tests to source code_** is a vital link in the **_software development process_**. Performing all test to system means using a lot of resources during the execution and sometimes the tests can take a long time to complete.

The development team could see their work hampered by waiting the result of all tests run every time he finished a task. To avoid this situation the review activity is delegated to **_continuous integration systems_** with higher-performance. These systems can be configured to perform activities in nightly hours for performance increase. Once the activity has been finished, the system send notifications to interested users.

This article shows how we can configure an **_iOS 9 project_** with in **_continuous integration flow_** using **_Jenkins_**.

### How does it work?

<a href="https://wiki.jenkins-ci.org" target="_blank">_Jenkins_</a> can be configured to perform tests on **_iOS 9 projects_**. In **_Jenkins’ repository_** exist the **_XCode integration_** plugin that allows us compile the source code and execute tests.

The <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">_XCode integration_</a> plugin does the execution of the tests and the result is written in a file with **_XML_** format inside the project. The **_XML_** file generated can be read by **_JUnit_**. That’s why we are going to use the <a href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin" target="_blank">_JUnit_</a> plugin to show the tests executed in the **_iOS 9 project_**. The <a href="https://wiki.jenkins-ci.org/display/JENKINS/Test+Results+Analyzer+Plugin" target="_blank">_Test Result Analyzer_</a> plugin will show the results of the **_tests on graphics_** for a better understanding.

### Prerequisites

To take the steps mentioned in this article you must complete the following requirements:

* Having <a href="https://jenkins-ci.org/" target="_blank">_Jenkins_</a> installed.
* Having  <a href="https://developer.apple.com/xcode/ide/" target="_blank">_XCode 7_</a> installed.
* Having an **_iOS 9 project created with unit test_** implemented.

**_Jenkins_** is a cross platform system. However, if it have installed in a computer with a different operating system to **_Mac OS_** you must also include the following:

* Having a machine with operating system **_Mac OS 10.10.5_**.
* Configuring the **_Mac OS_** machine as **_Jenkins Node_** to execute jobs. 
* Having **_XCode 7_** installed in Mac OS machine.

### Source code

If you don’t have an **_iOS 9 project_** created, you can access <a href="https://github.com/mmorejon/time-table" target="_blank">the source code used for the article</a>.

### Environment

The environment configuration used for this article is the following:

```
### Continuous Integration System ###
             OS: Ubuntu 14.04
        Jenkins: 1.635
   XCode Plugin: 1.4.9
   JUnit Plugin: 1.9
Test Results 
Analyzer Plugin: 0.2.1

### Jenkins Node ###
          	 OS: Mac OS 10.10.5
       	  XCode: 7

### Project iOS 9 ###
       Language: Swift
```

## Step One – Install Jenkins’ plugins.

You must follow these steps to install the plugins on Jenkins:

* Open Jenkins in your web browser.
* Navigate to **_Manage Jenkins > Manage Plugins_**.
* Select **_Available_** panel.
* Filter by **_Xcode integration_** and select it to install. Repeat this step using **_Junit Plugin_** and after **_Test Results Analyzer Plugin_**.
* Click on button **_Install without restart_** after having the plugins selected.
* Click on button **_Restart Jenkins_** when the installation is complete.

After restart you should go back to **_Manage Jenkins > Manage Plugins_** and verify that plugins were installed correctly. You should also verify the  plugins version with **_Environment_** section.

## Step Two – Create new Jenkins’ job.

Select **_New Item_** on Jenkins home page. After, fill the field **_Item name_** with the desired value and select **_Freestyle project_**. We used `time-table` for the example.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/create-task-en.jpg" title="Creating Jenkins’ job." name="Creating Jenkins’ job." />

Once the job has been created, select **_Configuration_** option to realize required settings inside.

## Step Three – Executing the job on Mac OS Node.

If the machine with **_Mac OS_** operating system is a **_Jenkins’ Node_** then the job must be restricted only for this Node.

To accomplish, you must select **_Restrict where this project can be run_** option. We used `Mac OS` as node name for the example.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/nodo-mac-en.jpg" title="Mac Node for Jenkins" name="Mac Node for Jenkins" />

## Step Four – Get project’s source code.

The section **_Source Code Management_** must be configured. We used **_Git Plugin_** to get the source code from a local server.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/source-code-en.jpg" title="Source Code Management in Jenkins" name="Source Code Management in Jenkins" />

## Step Five – Configure XCode Plugin.

To incorporate the functionalities of **_XCode Plugin_**  we click on **_Add build step_** button and select **_Xcode_** option.

The plugin has four sections: _General build settings_, _Code signing & OS X keychain options_, _Advanced Xcode build options_ and _Versioning_. In this article we are going to use only two of them: **_General build settings_** and **_Advanced Xcode build options_**.

**_General build settings Section_**

The **_Configuration_** field is set with `Debug` value. The plugin set the value `Release` by default.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/general-build-settings-en.jpg" title="General build settings Section" name="General build settings Section" />

**_Advanced Xcode build options Section_**

The scheme where the tests are performed must be established. The **_Xcode Schema File_** field is responsible for storing this value. We set `TimeTable` for the example.

The field **_Custom xcodebuild arguments_** is used to add custom elements to the execution. In this case, writing `test` is required to execute the tests of the project.

The `-destination` parameter has also been added to perform tests on a specific device. The example has been configured for **_iPhone 6_** and the text for this device is the following: `-destination 'platform=iOS Simulator,name=iPhone 6,OS=9.0'`.

The configurations described above are shown in the following figure.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/advance-xcode-build-en.jpg" title="Custom xcodebuild arguments" name="Custom xcodebuild arguments" />

## Step Six – Configure JUnit Plugin.

JUnit plugin is responsible for showing the results of executed tests in the project. The XCode plugin generates an XML file into the folder `test-reports` located in the root of project. The JUnit plugin has to be configured to interpret the XML file generated by the XCode plugin. The results are shown on the Jenkins web.

First of all, click on **_Add post-build action_** button and select **_Publish Junit test result report_**. After, fill the **_Test report XMLs_** field with the location of XML file generated by the XCode plugin.

The following figure show the configuration of the Junit plugin.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/junit-settings-en.jpg" title="Junit plugin configuration" name="Junit plugin configuration" />

Up to this point task settings have been completed. To save changes click on **_Save_** button at the end of the screen.

**_Let’s run the job!!!_** Everything is ready to see the configuration’s result.

## Step Seven – Run Jenkins’ job.

Once configurations have been finished, click on **_Build Now_**. The execution can be finished successfully or not depending on the tests created in the project.

If you use the source code proposed by this article the execution will be finished successfully. During the process the node will automatically launch the **_XCode’s emulator_** to perform the tests. The emulator displays the following screen.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/screen.jpg" title="XCode’s emulator" name="XCode’s emulator" />

We can also inspect **_Console Output_** for this job and see the results. Console’s fragments will be shown below.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-01.jpg" title="Console Output 01" name="Console Output 01" />

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/output-console-02.jpg" title="Console Output 02" name="Console Output 02" />

## Step Eight – Show job’s reports.

Reviewing the state of the tests is important. Click on the job created and it will show a graphic of results trend.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-01-en.jpg" title="Graphic with the trend of results 01" name="Graphic with the trend of results 01" />

Select **_Test Result_** to get a detailed view of the results.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-02-en.jpg" title="Graphic with the trend of results 02" name="Graphic with the trend of results 02" />

**_Show the results using Test Result Analyzer plugin_**

Click on the job and select **_Test Result Analyzer_**.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-01.jpg" title="Test result analyzer 01" name="Test result analyzer 01" />

Select **_Get Build Reports_** button and it will show a table with the results of the tests.

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-02.jpg" title="Test result analyzer 02" name="Test result analyzer 02" />

If you want to see the results in a graph just select **_Generate Charts_** button and it will show similar reports to the following image:

<img src="{{ site.baseurl }}/images/jenkins-ios9-xcode/test-result-analyzer-03.jpg" title="Test result analyzer 03" name="Test result analyzer 03" />

## Final Thoughts

**_Automate testing for iOS 9 projects is possible_**. Delegating the execution of test cases to higher-performance machines **_simplifies the development process_**. Jenkins allows for configuration of our environment to get these goals, **_we just need to do it_**.

### Significant Revisions

* <a href="https://wiki.jenkins-ci.org" target="_blank">Jenkins Official Site.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xcode+Plugin" target="_blank">XCode Plugin for Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin" target="_blank">JUnit Plugin for Jenkins.</a>
* <a href="https://wiki.jenkins-ci.org/display/JENKINS/Test+Results+Analyzer+Plugin" target="_blank">Test Results Analyzer Plugin for Jenkins.</a>