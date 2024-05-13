# Redundancy

## Strategy Design

It is assumed that each SP provides more stable service and won’t go offline as enough BNB are staking to be one SP in Greenfield. But as there are a few SPs distributed all over the world in Greenfield, Greenfield still needs to have its own redundancy strategy in case some SP goes offline for some unexpected reasons. 
Considering the data locality, people can get better storage service from the SPs in the same region. So Greenfield provides below redundancy strategy:

- Replica and EC are used in the Greenfield network; Default EC is 4+2, 4 data chunks and 2 parity chunks.

- All segments of each object are stored in primary SP as pieces which can be regarded as one replica of the object.

- All EC chunks of each object are stored in some secondary SPs as pieces, which can be regarded as one EC replica of the object.

- EC chunks are stored in secondary SPs with fixed rules.

## Segments

Segment is the basic storage structure of an object. An object payload is composed of one or many segments in sequence. The default segment size is 16MB. If the object's size is less than 16MB, it has only one segment and the segment size is the same as the object's size. For larger objects, the payload data will be broken into segments.

Please note the payload data of an object will be split into the same size segment but the last segment, which is the actual size. For example, if one object has a size 50MB, only the size of the last segment is 2 MB and the other segments' sizes are all 16MB.

## Erasure Code and Data Redundancy

Although each SP may provide a more stable service and won't go offline as enough BNB are staking to be one SP, Greenfield still establish its own redundancy strategy to get rid of the dependency on a single SP and support the data availability in a decentralized way. Here below is the basic design idea.

1. all segments of each object are stored in primary SP as "pieces", which can be regarded as one replica of the object. Users may download this data directly from the primary SP as it is supposed to provide the full data in a low latency way.

2. Erasure Code (EC) is introduced to get efficient data redundancy. Segment is the boundary to perform erasure encoding. By erasure encoding one segment at a time, it allows streaming the processing of the object upload without waiting for the whole object payload to finish. The default EC strategy is 4+2, 4 data chunks, and 2 parity chunks for one segment. The data chunk size is ¼ of the segment. As one typical segment is 16M, one typical data chunk of EC is 4M. Specialized customization on EC parameters for each user may be provided via special transactions.

All EC chunks of each object are stored in some secondary SPs as pieces, which can be regarded as more than one EC replica of the object. If one or more segments of the object are lost from the primary SP, any 4 chunks from 6 SPs can recover the segments.

All these segments and SPs information are stored on the Greenfield blockchain as the metadata of the object. The same object's each segment's EC replicas are stored in the same sequence of secondary SPs. This convention is to save the metadata size. An example of a 50M object stored with one primary SP, SP0, and 6 secondary SPs, SP1-SP6 is shown in the below diagram.

![ec-flow](../../../static/asset/10-SP-EC.jpg)

<div style={{textAlign:'center'}}><i>EC for Segments in Different Secondary SPs</i></div>

Below is how the key of each piece is defined:

1. The key is `"sobjectID"+"ssegIndex"` for each segment piece, such as `sobjectID_s0`.

2. The key is `"eobjectID"+"ssegIndex"+"pSPIndex"` for each groups after EC, such as `eobjectID_s0_p0`.

The same column data will be stored into same SP.
