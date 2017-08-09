namespace banheiro.service
{
    partial class BanheiroService
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.notify = new System.Windows.Forms.NotifyIcon(this.components);
            // 
            // notify
            // 
            this.notify.Text = "notify";
            this.notify.Visible = true;
            this.ServiceName = "BanheiroLivre";

        }

        #endregion

        private System.Windows.Forms.NotifyIcon notify;
    }
}
