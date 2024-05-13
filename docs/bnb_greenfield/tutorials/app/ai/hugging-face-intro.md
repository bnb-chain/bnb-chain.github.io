---
title: Greenfield for Hugging Face
description: How to use Greenfield for building AI applications.
keywords: [BNB Greenfield, AI, decentralized datasets]
order: 1
---

# AI Tutorials Serials: How to use Greenfield for Hugging Face

[Hugging Face](https://huggingface.co/) is a leading company and open-source community in the field of natural language processing (NLP) and artificial intelligence. It's similar to GitHub in that it provides a space for developers to code and deploy AI applications, including language models, transformers, text2image, and more.

Using decentralized storage networks for machine learning data storage not only increases efficiency by enabling parallel retrieval from multiple nodes, reducing latency, and enhancing download speeds, but it also offers heightened security. The decentralized architecture eliminates a single point of failure, making the data more resilient against potential security threats. This ensures that even if individual nodes are compromised, the overall integrity and security of the data remain intact.

In this tutorial, you will learn:

- Why Greenfield is a good choice for storing machine learning data
- What’s the potential architecture of building AI on Greenfield
- What’s the process of dataset and model management on Greenfield and sample code

# Why do we need to store machine learning data in Greenfield

## Data Privacy By Built-in Access Control

Platforms, like Hugging Face, offer the flexibility to make [models](https://huggingface.co/models) and [datasets](https://huggingface.co/datasets) public or collaborate on them privately within organizational repositories. Users can explore data directly in their browser. Creating private datasets is used to address licensing or privacy concerns.

The Greenfield Blockchain is a very good place to store machine learning models and dataset. It offers a comprehensive access control framework of resources, including buckets, objects, and groups, which can be mirrored on the BNB Smart Chain (BSC) as non-fungible tokens (NFTs) adhering to the ERC-721 standard. Smart contracts on BSC can directly manage these mirrored resources, impacting storage formats, access permissions, and other data aspects on Greenfield. This integration enhances flexibility and accessibility, streamlining and optimizing data management across both platforms.

## Monetization

![img](https://lh7-us.googleusercontent.com/J25Ptj9c7r6IeJ2WHw-cAdbMxmjLmYZPD7fTPUGrGggyS3iqqoPi8F-y40rvxVKaX7wEgjODWHb7xjC63b1Fz74RWQz9j7Ftd3IdUw9rpEwtCbc-swyV1q0KgKb27j6QHvfZDptSMwDjljgeC3lIaSI)

The [data marketplace](https://marketplace.greenfield-sp.bnbchain.org/bsc-testnet.html) on Greenfield empowers users to sell or trade high-quality machine learning datasets and models. Whether you're a seasoned data scientist or an organization with valuable data assets, our marketplace provides a secure and efficient space to monetize your creations or discover unique datasets and models crafted by others.

# The Potential Architecture of AI in Greenfield

There are 3 key parts:

- Machine learning datasets and models are stored in Greenfield Storage provider
- Greenfield Nodes will handle users request to train/execute models
- Executiion environment can be your own machine or cloud servers. [Greenfield Execute](https://www.bnbchain.org/en/blog/greenfield-executable-a-new-initiative-to-unlock-the-potential-of-open-data-economy) will also be able to provide environments for model execution in the future.

# Datasets Management in Greenfield

The following examples explain how to use Greenfield for Hugging Face datasets management. You will learn how to backup datasets and how to download from Greenfield for training purposes.

## Transfer Dataset to Greenfield

If your dataset is already on [Hugging Face Hub](https://huggingface.co/datasets), you can use the [load_dataset_builder](https://huggingface.co/docs/datasets/v2.8.0/en/package_reference/loading_methods#datasets.load_dataset_builder) function to download. It'll first download raw datasets to your local directory then save it to to Greenfield. Here we transfer the dataset [no-robots](https://huggingface.co/datasets/HuggingFaceH4/no_robots) to Greenfield

```python
    from datasets import load_dataset

    # Load dataset

    dataset = load_dataset("HuggingFaceH4/no_robots")

    # Save locally and prepare upload

    dataset.save_to_disk("your_local_directory")

    zip_output_filename = "you_zip_file_name"

    shutil.make_archive(zip_output_filename, '', folder_to_compress)

    # logging.info(f"---> Create Bucket <---")

    create_bucket = await client.bucket.create_bucket(

    bucket_name,

    primary_sp_address=sps[0].operator_address,

    opts=CreateBucketOptions(charged_read_quota=100, visibility=VisibilityType.VISIBILITY_TYPE_PRIVATE),

    )

    logging.info(f"Result: {create_bucket}\n\n")

    await client.basic.wait_for_tx(hash=create_bucket)

    ## Create Object

    # First,Open the file in binary mode and read its contents

    content = read_file_to_buffer(zip_output_filename)

    # Send Create Object Transaction

    logging.info(f"---> Create Object <---")

    object = await client.object.create_object(

          bucket_name,

          object_name,

          reader=content,

          opts=CreateObjectOptions()

     )

    logging.info(f"Result: {object}\n\n")

    # Send Put Object Transaction to SP and wait for seal

    await client.basic.wait_for_tx(hash=object)

    logging.info(f"---> Put Object <---")

    put_object = await client.object.put_object(
            bucket_name,
            object_name,
            object_size=content.getbuffer().nbytes,
            reader=content.getvalue(),
            opts=PutObjectOptions()
       )

    logging.info(f"Result: {put_object}\n\n")
```

## Download Dataset from Greenfield

Once you've access to a dataset in Greenfield, you can save it using the `fget_object` method.

```python
## Download Object

path = "path/to/your/local/folder"

logging.info(f"---> Get Object <---")

await client.object.fget_object(

     bucket_name,

     object_name,

     path,

opts=GetObjectOption()

   )

logging.info(f"Result: {get_object}\n\n")
```
Use the `load_from_disk` method to access your datasets.
```
from datasets import load_dataset

dataset = load_dataset('parquet', data_files='path/to/my/dataset/folder')
```
# Model Management in Greenfield

The following examples explain how to use Greenfield for Hugging Face model management. You will learn how to backup models and how to download from Greenfield for testing and execution purposes.

## Transfer Model to Greenfield

Given the typically substantial size of machine learning models, it is recommended to employ git lfs for downloading them to your local machine.

```bash
git lfs install

git clone git@hf.co:<MODEL ID> # example: git clone git@hf.co:bigscience/bloom
```

For example, let’s download the `t5-small` model

```bash
git clone https://huggingface.co/t5-small
```

After obtaining the local binaries, you can utilize the gnfd-cmd tool to upload them to Greenfield. This is particularly advantageous as Greenfield supports resumable object transfers, enhancing the reliability and efficiency of the uploading process.

```bash
gnfd-cmd object put --visibility=private {path/to/your/local/model} gnfd://{bucket_name}/{object_name}
```

## Load Model from Greenfield

First, you can follow the same process to download model files to your local directory.

## Download Object of model from Greenfield
```python
model_path = "path/to/your/local/folder"

logging.info(f"---> Get Model <---")

await client.object.fget_object(

     bucket_name,

     object_name,

     path,

opts=GetObjectOption()

   )

logging.info(f"Result: {get_object}\n\n")
```
Then, you can load and run the `t5-small` model locally.
```python
from transformers import T5ForConditionalGeneration, T5Tokenizer

model_path = '/path/to/t5-small'

# Load model and tokenizer

model = T5ForConditionalGeneration.from_pretrained(model_path)

tokenizer = T5Tokenizer.from_pretrained(model_dir,legacy=False)

# Prepare input text

input_text = "translate English to French: The quick brown fox jumps over the lazy dog."

# Tokenize input text

input_ids = tokenizer.encode(input_text, return_tensors="pt")

# Generate output with max_new_tokens

output = model.generate(input_ids, max_new_tokens=50) # Generates up to 50 new tokens

# Decode and print the translated text

translated_text = tokenizer.decode(output[0], skip_special_tokens=True)

print(translated_text)
```
# Next Steps

In the upcoming articles, we'll delve into more topics to further enhance your understanding and proficiency.

- How to connect training process and datasets: We'll explore how to seamlessly connect the training process with datasets, ensuring a smooth and effective workflow.
- How to leverage executable for the modeling execution.Additionally, we'll guide you on harnessing the power of executables for efficient modeling execution, providing insights into optimizing your machine learning endeavors.

# Conclusion

In this tutorial, we go through the potential of Greenfield for machine learning workloads, particularly for Hugging Face. By leveraging decentralized storage compatibility, developers can enjoy the enhanced performance, cost-effectiveness, and robust data security inherent in a decentralized cloud storage system. This integration exemplifies a paradigm shift towards more resilient and economical cloud computing solutions

## Resources

Github link:

- https://github.com/maxnodereal/greenfield-python-sdk/blob/main/examples/basic_datasets.py
- https://github.com/maxnodereal/greenfield-python-sdk/blob/main/examples/basic_model.py