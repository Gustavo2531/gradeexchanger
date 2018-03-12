
# Grade Exchanger

https://hyperledger.github.io/composer/reference/acl_language.html

Refer to lecture on Access Control Language


#1 Create the BNA archive from the folder dist
composer archive create  --sourceType dir --sourceName ../ -a archiveAny.bna

#2 Deploy the archive to runtime form the folder dist
composer network deploy -a archiveAny.bna -c PeerAdmin@hlfv1 -A admin -S adminpw

#admin>> org.hyperledger.composer.system.NetworkAdmin#admin

#3 DO NOT - Import the card
composer card delete -n admin@grade-exchanger
composer card import -f admin@grade-exchanger.card

#4 Add a new participants

composer participant add -d '{"$class":"mx.itesm.gradeexchanger.participant.GENetworkAdmin","participantKey":"acloudfan","contact":{"$class":"mx.itesm.gradeexchanger.participant.Contact","fname":"a","lname":"f","email":"acloudfan@ge.com"}}' -c admin@grade-exchanger

#5 Issue the identities
composer identity issue -u acloudfan -a mx.itesm.gradeexchanger.participant.GENetworkAdmin#acloudfan -c admin@grade-exchanger

#7 Rebuild the archive
composer archive create  --sourceType dir --sourceName ../ -a archiveAny2.bna

#8 Update the Network
composer network update -a ./archive15.bna -c admin@grade-exchanger
composer-rest-server -c acloudfan@grade-exchanger -n always -w true