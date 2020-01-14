#./chemrpsenvprepare

#source .env

#cp ./chemrps.env .env
#./chemrpsenvprepare

#source .env



#cd ./chemrpsapi

#copy chemrps.env .env

#copy .env chemrpsapi /Y

#copy .env chemrpsbulksdfileloadconsole /Y

#copy .env chemrpslibrarytestconsole /Y

#copy .env chemrpsweb /Y

#copy .env database /Y

docker-compose -f chemrps.yml up -d