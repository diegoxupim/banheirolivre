using System;
using System.IO;
using System.Net;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace windows.task
{
    public partial class NotificacaoBanheiro : Form
    {
        bool ativar;
        public NotificacaoBanheiro()
        {
            InitializeComponent();
           
        }
        void Exit(object sender, EventArgs e)
        {
            // Hide tray icon, otherwise it will remain shown until user mouses over it
            notify.Visible = false;
            Application.Exit();
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            ativar = true;
            notify.ContextMenu = new ContextMenu(
               new MenuItem[] {
                    new MenuItem("Parar", Parar),
                    new MenuItem("Encerrar", Exit)
               });

            Iniciar(null, e);
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
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(@"http://172.27.72.52:8080/api");
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
                    Thread.Sleep(2000);
                }
                catch(Exception ex)
                {
                    notify.Icon = Properties.Resources.unknown;
                    Thread.Sleep(5000);
                }

                Thread.Sleep(1000);
            }
        }
        protected override void OnClosed(EventArgs e)
        {
            base.OnClosed(e);
            notify.Dispose();
        }
    }
}
