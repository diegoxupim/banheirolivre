using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Reflection;
using System.ServiceProcess;
using System.Threading;
using System.Windows.Forms;

namespace banheiro.service
{
    public partial class BanheiroService : ServiceBase
    {
        public bool ativar;

        public BanheiroService()
        {
            // The Windows.Forms Component Designer must have this call.
            InitializeComponent();

            // TODO: Add any initialization after the InitComponent call
        }

        /// <summary>
        /// Set things in motion so your service can do its work.
        /// </summary>
        protected override void OnStart(string[] args)
        {
            EventLog.WriteEntry("My simple service started.");
        }

        /// <summary>
        /// Stop this service.
        /// </summary>
        protected override void OnStop()
        {
            // TODO: Add code here to perform any tear-down necessary to stop your service.
        }
        void Exit(object sender, EventArgs e)
        {
            // Hide tray icon, otherwise it will remain shown until user mouses over it
            notify.Visible = false;
            Application.Exit();
        }
        void Parar(object sender, EventArgs e)
        {
            notify.ContextMenu = new ContextMenu(
               new MenuItem[] {
                    new MenuItem("Iniciar", Iniciar),
                    new MenuItem("Encerrar", Exit)
               });

        }
        void Iniciar(object sender, EventArgs e)
        {
            var _assembly = Assembly.GetExecutingAssembly();
            while (ativar)
            {
                try
                {
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(@"http://172.27.72.235:8080/api");
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    string content = new StreamReader(response.GetResponseStream()).ReadToEnd();
                    switch (content)
                    {
                        case "truetrue":
                            notify.Icon = Properties.Resources.truetrue;
                            notify.Text = "Pra variar os dois ocupados!";
                            break;
                        case "truefalse":
                            notify.Icon = Properties.Resources.truefalse;
                            notify.Text = "Corre que o principal está livre!";
                            break;
                        case "falsetrue":
                            notify.Icon = Properties.Resources.falsetrue;
                            notify.Text = "Corre que o da recepção está livre!";
                            break;
                        case "falsefalse":
                            notify.Icon = Properties.Resources.falsefalse;
                            notify.Text = "Um milagre os dois estão livres!";
                            break;
                        default:
                            notify.Icon = Properties.Resources.unknown;
                            break;
                    }
                }
                catch
                {
                    notify.Icon = Properties.Resources.unknown;
                    Thread.Sleep(5000);
                }

                Thread.Sleep(1000);
            }
        }
    }
}