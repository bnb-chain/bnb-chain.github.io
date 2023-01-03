---
sidebar_label: NFT Metadata Standard
sidebar_position: 1
---
# NFT Metadata Standard

## Implementing Token URI

To facilitate a marketplace on BSC to pull in off-chain metadata for BEP721 assets, the NFT contract will need to return a URI where the metadata can be found. To find this URI, the tokenURI method in ERC721 and the uri method in ERC1155 are used to track your NFT. You should implement the function in the Contract:

```

/**
 * @dev Returns an URI for a given token ID
 */
function tokenURI(uint256 _tokenId) public view returns (string) {
  return Strings.strConcat(
      baseTokenURI(),
      Strings.uint2str(_tokenId)
  );
}

```

The tokenURI function in your Contract should return an HTTP or IPFS URL. When queried, this URL should in turn return a JSON blob of data with the metadata for your token.

## Metadata Structure

Marketplaces on BSC support metadata that is structured according to [the official ERC721 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md). Additionally, several properties for your items are supported, giving you all the sorting and filtering capabilities on BSC Marketplaces.
The below metadata structure, allows the BSC Marketplace to read and display the details about the assets which your NFTs represent.

```

{
    "name":"NFT Name",
    "description":"NFT Description",
    "image":"https://somedomain.com/pic/xxxx.jpg",
    "external_url":"https://originalsite.io/2",
    "attributes":[...]
}

```

Here's how each of these properties work:

| Property         | Description                                                                                                                                                                                  |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     name         | Name of the item. Max 200 characters.                                                                                                                                                        |
| description      | A human-readable description of the item. Markdown is supported. Max 500 characters.                                                                                                         |
| image            | This is the URL to the image of the item. It can be just about any type of image. A 350 x 350 image is recommended.                                                                             |
| animation_url    | This is the URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. |
| animation_type   | This is the file format of the multi-media attachment provided from animation_url.                                                                                                           |
| external_url     | This is the URL that will appear below the asset's image on the marketplace and will allow users to leave the marketplace and view the item on your site.                                    |
| attributes       | These are the attributes for the item to describe the detail of the NFT. (see array below)                                                                                                   |

### Attributes
To present NFT traits, include the following array in the metadata: 

```

{
    "attributes":[
        {
            "trait_type":"Rarity Class",
            "value":"Normal"
        },
        {
            "trait_type":"Type",
            "value":"Male"
        },
        {
            "trait_type":"Face",
            "value":"Mole"
        },
        {
            "trait_type":"Beard",
            "value":"Chinstrap"
        },
        {
            "display_type":"boost_number",
            "trait_type":"Power",
            "value":"Power"
        },
        {
            "display_type":"boost_percentage",
            "trait_type":"Health Increase",
            "value":"20"
        },
        {
            "display_type":"number",
            "trait_type":"Generation",
            "value":"3"
        }
    ]
}

```

Here `trait_type` is the name of the trait, `value` is the value of the trait, and `display_type` is a field indicating how you would like a numeric value should be displayed. For string traits, you don't have to worry about `display_type`. 
All traits included in the attributes will be displayed in `Attribute`.
If you don't want to have a `trait_type` for a particular trait, you can include just a value in the trait and it will be set as a generic attribute.

#### Numeric Traits
There are 3 supported options for `display_type`: `number` will show the value in pure number, `boost_number` allows you to show the number with Plus or Minus symbol, and `boost_percentage` is similar to boost_number but will show a percent sign behind the number.

#### Date
Marketplace also supports date traits in `date` `display_type`. Pass in a unix timestamp as the value.

```

   {
      "display_type": "date", 
      "trait_type": "birthday", 
      "value": 1608490000
    }
    
```