#call chemrpsenvprepare.bat

#source .env

#./chemrpsenvprepare

#source .env



#cd ./chemrpsapi

#copy chemrps.env .env

copy .env chemrpsapi /Y

copy .env chemrpsbulksdfileloadconsole /Y

#copy .env chemrpslibrarytestconsole /Y

copy .env chemrpsweb /Y

copy .env database /Y

copy .env php /Y



#copy chemrps.env+.env .env


docker-compose -f ./chemrps.yml build