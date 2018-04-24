pragma solidity ^0.4.11;

contract VoteApp {
    struct Vote {
        bytes32 question;
        bytes32[] answers;
        mapping (bytes32 => uint8 ) voteCnt;
    }

    Vote vote;

    function VoteApp(bytes32 quest, bytes32[] answ) public {
        vote.question = quest;
        vote.answers = answ;
    }

    function voting(bytes32 answ) public {
        require(validAnswer(answ));
        vote.voteCnt[answ] += 1;
    }

    function getQuestion() public returns (bytes32) {
        return vote.question;
    }

    function getAnswers() public returns (bytes32[]) {
        return vote.answers;
    }

    function getVoteCnt() public return (mapping) {
        return vote.voteCnt;
    }

    function validAnswer(bytes32 answ) view public returns (bool) {
        for(uint i = 0; i < vote.answers.length; i++) {
            if (vote.answers[i] == answ) {
                return true;
            }
        }

        return false;
    }
}
