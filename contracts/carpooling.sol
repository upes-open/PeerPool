// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract carpooling {

    struct ride {
        string origin;
        string destination;
        uint departuretime;
        uint8 fare;
        uint8 seats;
    }

    mapping (uint => address) public rideowner;
    uint ridecount = 0;
    ride[] public rides;

    function createride(string memory _origin, string memory _destination, uint _departuretime, uint8 _seats, uint8 _fare) public {
        rides.push(ride(_origin, _destination, _departuretime, _seats,_fare));
        rideowner[ridecount] = msg.sender;
        ridecount++;
    }  


     function searchride(uint i, string memory __origin, string memory __destination)public view returns(string memory origin, string memory destination, uint departuretime, uint8 fare, uint8 seats) {
        if (keccak256(abi.encodePacked(rides[i].origin)) == keccak256(abi.encodePacked(__origin)) && keccak256(abi.encodePacked(rides[i].destination)) == keccak256(abi.encodePacked(__destination))) { 
            return (rides[i].origin, rides[i].destination, rides[i].departuretime, rides[i].fare, rides[i].seats);
        }        
    }

}