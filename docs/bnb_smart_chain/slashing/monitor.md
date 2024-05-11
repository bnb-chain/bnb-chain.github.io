# Monitor Slash Events

Generally, without maliciously altering BSC node code or mistakenly running the validator, validators would not typically incur double sign slashes or malicious vote slashes.

Validators should consistently monitor for potential slashes due to node unavailability, as it can lead to slash events.

As best practice, it is advisable to  keep monitoring the event log of the slash contract on the BSC scanner at 
<https://bscscan.com/address/0x0000000000000000000000000000000000001001#events>.

You can check your validator's slash indicator in the above contract. Pay attention to values above 30. If it goes over 50, the validator will be slashed. If it goes over 150, the validator will be jailed.
