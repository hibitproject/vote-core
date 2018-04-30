pragma solidity ^0.4.11;

contract VoteApp {
    struct Vote {
        bytes32 question;
        bytes32[] answers;
        uint[5] voteCnt;
    }
    mapping (bytes32 => uint) indexInfo;

    Vote vote;

    function VoteApp(bytes32 quest, bytes32[] answ) public {
        vote.question = quest;
        vote.answers = answ;

        for(uint i=0; i < answ.length; i++){
            indexInfo[vote.answers[i]] = i;
        }
    }

    function voting(bytes32 answ) public {
        uint index = indexInfo[answ];
        vote.voteCnt[index] += 1;
    }

    function getQuestion() public returns (bytes32) {
        return vote.question;
    }

    function getAnswers() public returns (bytes32[]) {
        return vote.answers;
    }

    function getCnt() public returns (uint[5]) {
        return vote.voteCnt;
    }

    function getIndexAnswers(bytes32 answ) public returns (uint) {
        for (uint i = 0; i < vote.answers.length; i++){
            if ( vote.answers[i] == answ ){
                return i;
            }
        }
        return uint(-1);
    }
}
