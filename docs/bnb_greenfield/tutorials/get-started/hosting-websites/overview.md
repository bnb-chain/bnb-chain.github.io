---
title: Hosting a Website on Greenfield
order: 1
---

# Creating and uploading a website with CLI

## Introduction
In today's era, having a website has become essential for individuals and businesses alike. With advancements in AI, tools like ChatGPT and Bard can help create a simple website or boilerplate with just a few sentences. This tutorial will guide you through the process of creating and uploading a website to BNB Greenfield, a decentralized storage on the BNB Chain. 

## Creating a website

A website typically consists of HTML pages, CSS stylesheets, and JavaScript scripts for enhanced interactivity. These files work together to create the visual layout, design, and functionality of the website. Go to the AI tool of your choice and type something like “Create a website about Plato's biography with images”. And ideally, after a few iterations, you’ll get to a decent-looking website.

## Deploying a website

Deploying a website to a web hosting platform is crucial because it makes the website publicly accessible and ensures its availability to users. When a website is hosted on a cloud server it becomes accessible to anyone with an internet connection. Users can access the website by typing its URL or domain name into a web browser.

In the case of BNB Greenfield, the decentralized network of storage providers contributes to increased availability by distributing the website's files across multiple nodes. Additionally, decentralized networks like BNB Greenfield provide data redundancy by storing multiple copies of the website's files on different nodes, reducing the risk of data loss. BNB Greenfield prioritizes security measures to protect websites and their data from unauthorized access, cyber threats, and data breaches. 

### Creating a Bucket

To start, create a separate bucket for your website on BNB Greenfield using the following command: 

```bash
./gnfd-cmd bucket create --visibility=public-read gnfd://my-plato-website --primarySP 0x231099e40E1f98879C4126ef35D82FF006F24fF2
```

The example return message is like the following:
```
make_bucket: my-plato-website
transaction hash:  E083FB2647D0A53640B63AD1DB8EFA0E1C5CC05454C0774E3DB2A4822E73D423
```

You can verify the transaction in explorer [here](https://greenfieldscan.com/tx/E083FB2647D0A53640B63AD1DB8EFA0E1C5CC05454C0774E3DB2A4822E73D423).

### Uploading Supporting Files

Next, upload the stylesheet and image files to your newly created bucket. Set the visibility flag as public-read to make the files accessible to everyone: 

```bash
./gnfd-cmd object put --visibility=public-read ./plato.jpg gnfd://my-plato-website/plato.jpg ./gnfd-cmd object put --visibility=public-read ./styles.css gnfd://my-plato-website/styles.css
```
### BNB Greenfield Url

BNB Greenfield utilizes a specific URL format known as the BNB Greenfield Url to identify and access objects within its decentralized storage. The URL format follows the pattern: `gnfd://<bucket_name><object_name>?[parameter]*`. 

Let's break down the components of this format:

1. "gnfd://" - This is the fixed leading identifier that indicates the URL is associated with BNB Greenfield. It is mandatory and serves as a marker for Greenfield URLs.

2. bucket_name - Refers to the name of the bucket where the object is stored. It is a mandatory component and helps identify the specific storage location within BNB Greenfield.

3. object_name - Represents the name of the object (e.g., file) within the bucket. It is also mandatory and allows for precise identification of the desired resource.

4. parameter - This component is optional and consists of a list of key-value pairs. Parameters provide additional information for the URI, enabling customization or specific functionality. Examples of parameters could include cache settings or other metadata.

Additionally, BNB Greenfield allows Service Providers (SPs) to register multiple endpoints for accessing their services. For instance, an SP named "SP1" might request users to download objects via a URL like `https://greenfield.sp1.com/download`. The complete RESTful API for downloading an object from "SP1" would resemble: `https://greenfield.sp1.com/download/mybucket/myobject.jpg`, where "mybucket" is the bucket name and "myobject.jpg" is the specific object within that bucket.

In the context of our website, the bucket was created under the SP2 service provider, and the serving endpoint for accessing the website's content is `https://gnfd-testnet-sp-2.bnbchain.org/`. This endpoint allows users to access the website's files, such as HTML, CSS, images, and more, stored within the designated bucket on BNB Greenfield.

### Updating the references

Once the supporting files are uploaded, update the links in your HTML file to point to the correct URLs. Following the BNB Greenfield Url pattern, we need to update the URLs in our `index.html` file to ensure correct file retrieval.

For example, if we had an image file named `plato.jpg` located in the "images" directory, previously the URL reference would be "images/plato.jpg". However, with BNB Greenfield's URL format, we need to modify it to include the serving endpoint and the specific bucket name.

Instead of "images/plato.jpg", we would change it to `https://gnfd-testnet-sp-2.bnbchain.org/view/my-plato-website/images/plato.jpg`, where "my-plato-website" corresponds to the bucket name in which the file is stored. This updated URL ensures that the browser can retrieve the correct image file from BNB Greenfield.

But things get better! Since the BNB Greenfield URL format remains identical for all files within the same bucket, we can simplify the URLs for files residing within the same bucket. In the case of the CSS file, we can reference it using a relative path without specifying the full URL. For example:

```html
<link rel="stylesheet" type="text/css" href="styles.css">
```

Similarly, for the image file `plato.jpg`, we can use a relative path without the need to specify the full URL:

```html
<img src="plato.jpg" alt="Plato" class="plato-image">
```

By using relative paths, the browser will correctly fetch the CSS file and the image file from the same bucket within BNB Greenfield, eliminating the need to include the full path in these specific cases.

### Uploading HTML Files
Upload the modified index.html file to your bucket using the following command: 

```bash
./gnfd-cmd object put --visibility=public-read --contentType=text/html ./index.html 
gnfd://my-plato-website/index.html 
```

Example output:
```
object index.html created on chain
transaction hash:  20921F3C1DBE3F911217CE82BDC9DC2A745AF61912651A5F9D80F10989A8FC20

sealing...
upload index.html to gnfd://my-plato-website/index.html
```

Now, let's eagerly click the link to view our brand new website at https://gnfd-testnet-sp1.bnbchain.org/view/my-plato-website/index.html and feel the anticipation building up.

🥁Drum beat... 

But, oh no! Something went awry. Instead of the website loading, the file started downloading automatically. Frustration sets in, and I embarked on a lengthy debugging journey, spending a good hour trying to figure out the issue. 

Finally, I discovered the culprit: we forgot to specify the content type for the files, making them unrecognizable and causing them to be downloaded instead of served. 

However, let's not forget that BNB Greenfield is an immutable storage. So to update the file, we must first delete it and then reupload it. 

To accomplish this, I used the power of the 'object delete' command: 

```bash
./gnfd-cmd object rm gnfd://my-plato-website/index.html
```

Wait for the confirmation that the file was successfully deleted, accompanied by a transaction hash: 4B12BCF26525C1B661389529524DF14E23164D000FA47FB2E0D0BE26B131E04A.

And reupload the html file, this time accompanied by the content-type flag:

```bash
./gnfd-cmd object put --visibility=public-read --contentType=text/html ./index.html gnfd://my-plato-website/index.html
```

🥁🥁Drum beat intensifies... 

Oh, no! The website still looks horrendous, and worse yet, the image of Plato is nowhere to be found. Frustration turned into disappointment as we discovered that the browser was throwing an error due to an incorrect MIME type. It refused to apply the styles from https://gnfd-testnet-sp-2.bnbchain.org/view/my-plato-website/styles.css because the MIME type was set as 'text/plain', which is not a supported stylesheet MIME type when strict MIME checking is enabled.
Fear not! The error looks familiar and we already know exactly what needed to be done. So swiftly deleting the problematic files and reuploading them correctly this time:
```bash
./gnfd-cmd object rm gnfd://my-plato-website/plato.jpg
./gnfd-cmd object rm gnfd://my-plato-website/styles.css
```
And then, with a determined spirit:
```bash
./gnfd-cmd object put --visibility=public-read --contentType=image/jpeg ./plato.jpg gnfd://my-plato-website/plato.jpg 
./gnfd-cmd object put --visibility=public-read --contentType=text/css ./styles.css gnfd://my-plato-website/styles.css
```

🥁🥁🥁Drum beat crescendos... 

And finally, we heard the triumphant sound of trumpets! 

![Plato Website](website-example.png)

However, as we gaze upon [the site](https://greenfield-sp.bnbchain.org/view/my-plato-website/index.html), we can't help but admit that it doesn't look particularly astonishing. It falls short of our grandest expectations. Yet, considering that we generated and uploaded it in just a matter of minutes, it's still a decent outcome given our investment of time and effort.

The content and image look good though, it just needs more love with styling…but that’s a story for another tutorial.

## Conclusion

Our journey with website development has been filled with ups and downs. We encountered challenges along the way, but with perseverance and a little debugging, we managed to deploy our website successfully. 

BNB Greenfield's URL format and immutable storage principles require to be mindful of content types and careful when updating files. Despite the minor setbacks, BNB Greenfield remains a valuable platform for deploying websites, offering increased availability, reliability, and quite easy command tools.

Hope you enjoyed it and looking forward to see your websites on BNB Greenfield.