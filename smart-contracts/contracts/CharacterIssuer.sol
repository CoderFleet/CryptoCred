    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract CertificateIssuer {
        struct Certificate {
            string ipfsHash;
            string certHash;
            uint timestamp;
        }

        address public owner;
        mapping(address => Certificate[]) public userCerts;

        modifier onlyInstitute() {
            require(msg.sender == owner, "Not authorized");
            _;
        }

        constructor() {
            owner = msg.sender;
        }

        function issueCertificate(address user, string memory ipfsHash, string memory certHash) public onlyInstitute {
            userCerts[user].push(Certificate(ipfsHash, certHash, block.timestamp));
        }

        function getCertificates(address user) public view returns (Certificate[] memory) {
            return userCerts[user];
        }
    }
