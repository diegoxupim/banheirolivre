   M S B A M L   `   `   `  ����I  ESample Project, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null3clr-namespace:Samples.CommandsSamples.Commands  5   	   <    6Samples.Tutorials.ContextMenus.InlineContextMenuWindow   5   	   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   \ XHardcodet.Wpf.TaskbarNotification, Version=1.0.5.0, Culture=neutral, PublicKeyToken=null)tb http://www.hardcodet.net/taskbar  5   	   -commandsclr-namespace:Samples.Commands  5   	   $	��300��5   	   $	��300��5   	   .��5      � .+�5
   
   3  -Hardcodet.Wpf.TaskbarNotification.TaskbarIcon  -   5           Name$  MyNotifyIcon��5
         
IconSource$ /Icons/Error.ico��5         ToolTipText$ hello world��5       � ContextMenu 5      �� 5      .@�5      �� $1��+Hiding the sample window will not close it!��6    m� 5      $��_Show Sample Window [S]��6    m� Command 5      .   (Samples.Commands.ShowSampleWindowCommand   m� CommandParameter 5      ��  m� Icon 5      �� 5      $��16��6$   $��16��5   $   $��/Images/Add.png��5   $   5      �� 5      m� 5!      $��_Hide Sample Window [H]��6    5"      .   (Samples.Commands.HideSampleWindowCommand   5#      ��  5$      �� 5%      $��16��6$   $��16��5&   $   $��/Images/Remove.png��5'   $   5)      5*      5-      �� 5.   
   $��
26,26,24,0q�6   $	��Top=�5/      $
��Bold"�50      $
��Wrap=�51      �� 52       � Language$ de-ch�6   $4�.Right-click on NotifyIcon to open Context Menu��53      54      �� 55   
   $
��Left=�6   $��	26,83,0,0q�56      $
��Wrap=�57      $'��!Context menu preview open events:��58      $	��Top=�59      �� 5:   
   $
��Left=�6   $��26,103.96,0,0q�5;      $
��Wrap=�5<      $��Context menu open events:��5=      $	��Top=�5>      �� 5?   
   -   5         ��Name$ PreviewOpenEventCounter��5?      $
��Left=�5@      $��
246,83,0,0q�5A      $
��Wrap=�5B      $��0��5C      $	��Top=�5D      �� 5E   
   -   5        $ OpenEventCounter��5E      $
��Left=�5F      $��246,106.97,0,0q�5G      $
��Wrap=�5H      $��0��5I      $	��Top=�5J      �� 5K   
   -   5        	 ��Name$	 SuppressContextMenu��5K      $,��&Suppress context menu in preview event��5L      $
��Left=�5M      $��
26,190,0,0q�5N      $	��Top=�5O      5P      5Q      