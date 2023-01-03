// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract carpooling {
    struct human {
        string name;
        uint8 age;
        bool gender;    // 0 for female, 1 for male
    }
    struct ride {
        uint rideId;
        string origin;
        string destination;
        uint departuretime;
        uint fare;
        uint seats;
    }

    mapping (uint => address) public rideowner;
    mapping (uint => mapping(uint => address)) public rideToRider;
    uint8 public ridecount = 0;
    ride[] public rides;
    human[] public person;
    mapping (address => human) public addressDetails;
    // ride[] public searchRides;

    event rideCreated(
        uint rideId,
        string origin,
        string destination,
        uint departuretime,
        uint fare,
        uint seats        
    );
    event rideBooked(
        uint rideId,
        uint seats,
        address passenger
    );

    function newUser(string memory _name, uint8 _age, bool _gender) public {
        person.push(human(_name, _age, _gender));
        addressDetails[msg.sender].name = _name;
        addressDetails[msg.sender].age = _age;
        addressDetails[msg.sender].gender = _gender;
    }


    function createride(string memory _origin, string memory _destination, uint _departuretime, uint8 _fare, uint8 _seats) public {
        rides.push(ride(ridecount, _origin, _destination, _departuretime, _fare, _seats));
        rideowner[ridecount] = msg.sender;
        emit rideCreated(ridecount, _origin, _destination, _departuretime, _fare, _seats);
        ridecount++;
    }  

    function bookRide(uint rideId) public {
        rideToRider[rideId][rides[rideId].seats] = msg.sender;
        rides[rideId].seats -= 1;
        emit rideBooked(rideId, rides[rideId].seats, msg.sender);
    }

}