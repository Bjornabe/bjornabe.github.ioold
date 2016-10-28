using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        

        static void Main(string[] args)
        {
            using (Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp))
            {
                socket.Connect(new IPEndPoint(Dns.GetHostAddresses("www.moneypot.com").First(), 443));
                using (NetworkStream networkStream = new NetworkStream(socket))
                {
                    using (SslStream sslStream = new SslStream(networkStream))
                    {
                        sslStream.AuthenticateAsClient("www.moneypot.com");


                    }
                }
            }
        }

        static string CreateNewDepositAddress(SslStream sslStream)
        {
            string skeletonRequestHeader = @"POST https://www.moneypot.com/me/addresses HTTP/1.1
Host: www.moneypot.com
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://www.moneypot.com/me/receive
Cookie: __cfduid=daa3ad015c0fc6ae746a4658e49541b4e1474364590; _ga=GA1.2.882259221.1474364593; sessionId=125164c5-cb7a-4524-afbb-68667b75b482; 2fa=1; redirectToPath=/apps/926-bit-exo; _gat=1
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 21

coin=btc&memo=abcdefg";
        }
    }
}
