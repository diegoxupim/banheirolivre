using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace banheiro.service
{
    static class Program
    {
        // The main entry point for the process
        static void Main()
        {
            System.ServiceProcess.ServiceBase[] ServicesToRun;
            ServicesToRun = new System.ServiceProcess.ServiceBase[] { new BanheiroService() };

            System.ServiceProcess.ServiceBase.Run(ServicesToRun);
        }
    }
}
