# vote-core

## test

```
cd vote-core
git checkout mjc
```
  
```
docker run -it \
  --name qtumjs \
  -v `pwd`:/dapp \
  hayeah/qtumportal
```
  
```
docker exec -it qtumjs sh

]# qcli generate 600

]# qcli getbalance
```
  
```
docker logs qtumjs
```

## 참고자료  
* https://github.com/maheshmurthy/ethereum_voting_dapp/blob/master/chapter3/contracts/Voting.sol  
* https://github.com/nweintraut/ebay_dapp/blob/master/contracts/EcommerceStore.sol
*  http://joojis.tistory.com/entry/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80%EC%97%90%EC%84%9C%EC%9D%98-%EB%9E%9C%EB%8D%A4-%EA%B5%AC%ED%98%84  
* https://ethereum.stackexchange.com/questions/191/how-can-i-securely-generate-a-random-number-in-my-smart-contract
