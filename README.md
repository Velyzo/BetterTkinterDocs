# BetterTkinter Documentation
---------------------------------------------------------
             Welcome to Wavora Server!
---------------------------------------------------------

  A powerful server for all your needs.

  System Information:
  ---------------------------
  Hostname: $(hostname)
  Uptime: $(uptime -p)
  Disk Usage: $(df -h | grep '/$' | awk '{print $3 "/" $2 " (" $5 " used)"}')

  Service Status:
  -----------------
  Apache: $(systemctl is-active apache2)
  Docker: $(systemctl is-active docker)

  Recent Logs:
  ----------------
  $(tail -n 10 /var/log/syslog)

---------------------------------------------------------
  Secure Access Reminder:
  - Always log out when finished.
  - Use strong, unique passwords.
  - SSH is the recommended method of access.
---------------------------------------------------------

   $(figlet Wavora)
---------------------------------------------------------
