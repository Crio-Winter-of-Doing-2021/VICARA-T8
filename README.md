<h1 align="center">
  <br>
 <img width="120" height="120" src="./client/src/assets/logo512.png">
  <br>
  Storage Drive
  <br>

</h1>

<h5 align="center">
	A Storage Drive which you can own.
</h5>

<p align="center">
	<strong>
		<a href="https://storage-drive-frontend.herokuapp.com/">Website</a>
		•
		<a href="https://github.com/Crio-Winter-of-Doing-2021/VICARA-T8/wiki/Installation-Instructions">Docs</a>
		•
		<a href="">Demo Video</a>
	</strong>
</p>

<p align="center">
	<a href="https://github.com/Crio-Winter-of-Doing-2021/VICARA-T8/actions"><img
		alt="Build Status"
		src="https://github.com/Crio-Winter-of-Doing-2021/VICARA-T8/actions/workflows/backend.yml/badge.svg"></a>
  	<a href="https://github.com/Crio-Winter-of-Doing-2021/VICARA-T8/actions"><img
		alt="Build Status"
		src="https://github.com/Crio-Winter-of-Doing-2021/VICARA-T8/actions/workflows/frontend.yml/badge.svg"></a>
</p>

<p align="center">
A Storage Drive which you own. This Application provides integrating different cloud storage options like AWS Storage, Google Storage in market out there and perform all types of operations like store, delete and view.
</p>

## Storage Drive for Enterprises

Storage Drive for digital assets which can be adopted by enterprises and integrated with their other systems. Existing services such as Google Drive or DropBox don’t provide this flexibility and also increase the storage cost. Build the basic functionality like authentication, uploads, downloads, viewing and deleting files on a user friendly interface. Making it scalable and implementing additional features like favourites, recent uploads, and link based sharing. Implemented API based upload/download that enables customers to integrate it with their workflows and other systems.

### TechStack :

<img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Redux" src="https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/> <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss%20-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img src = "https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white"/> <img alt="GitHub Actions" src="https://img.shields.io/badge/github%20actions%20-%232671E5.svg?&style=for-the-badge&logo=github%20actions&logoColor=white"/> <img alt="Babel" src="https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black" /> <img alt="Docker" src="https://img.shields.io/badge/docker%20-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white"/>

### Architecture

- Authentication Flow : Auth 2.0 Access/Refresh Token Implementation.
- Data Streams for file Upload / Download : Data streams are used for both upload and download. DataStream used to reduce load on server for both upload and download.StreamSaver JS used for reduce load on client side downloading.
- Database : Mapping of data from Mongo Cloud DB to AWS S3.
<p align="center">
  <img src="https://user-images.githubusercontent.com/38184186/114436546-152bb700-9be3-11eb-89e8-eec86bc3d71a.png" alt="architecture"">
</p>

### UI / UX

<!-- GIF NEEDED -->

### Features

- Login / Register .
- Upload files.
- Add / Remove to and from favourites.
- Delete file.
- Download file.
- Public Shareable Link.
- Filtering / Sorting of files.
- Storage update card.

### CodeStyle

- Mobile responsive code.
- Object oriented style followed.
- Dependency Injection used with separation of code in controller / service / database layers.

### Installation

To setup a development environment.

- Follow the <a href="https://github.com/Crio-Winter-of-Doing-2021/VICARA-T8/wiki/Installation-Instructions">Wiki</a>.

### Contributors:

- [Rajat Kumar](https://github.com/991rajat)
- [Manas Uniyal](https://www.github.com/ManasUniyal)

### License

The MIT License 2021.
