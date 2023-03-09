## [OTSV] Pre-hiring assignment || Backend Developer (API/Node.js)
## Project description

A bookmark management API that allows users to bookmark their favorite websites by URL and manage their own bookmarks

## Features

- Allow user to bookmark their favorite websites.
- The website information will be automatically populated by the API for the title, description, and cover image (if it has).
- Users can get the list of their bookmark or a specific bookmark.
- Users can update the bookmark title, cover image, and description of the bookmark .
- Users can move a bookmark to the trash area.
- Users can recover the bookmark within 3 minutes since it was moved to the trash area. 
- If the bookmark is in the trash area for more than 3 minutes, it can not be restored (permanently deleted).

### Install the dependencies

Go inside the project and install the dependencies

```sh
yarn
```

### Run the project

```sh
yarn start
```

And also see the project API library at

```sh
http://localhost:5000/api/v1/documents/#
```

We can run our unit test using 

```sh
yarn test
```

### Test it out!

First, let create a bookmark at `https://baomoi.com/` using the post API

```sh
POST: 
http://localhost:5000/api/v1/bookmark

Request body: 
{
  "url": "https://baomoi.com/"
}
```

We will receive a bookmark with the following data: 

```sh
{
  "id": "248da758-8a42-49e0-89f8-114fb8f895e3",
  "title": "Báo Mới - Tin tức mới nhất cập nhật liên tục 24H",
  "url": "https://baomoi.com/",
  "image": "https://baomoi-static.bmcdn.me/web/styles/img/facebook-thumb.png",
  "description": "Báo Mới - Trang tin tự động cập nhật các tin tức Việt Nam và thế giới từ các  báo và  trang tin điện tử hàng đầu",
  "createdAt": "2023-02-13T15:36:41.222Z",
  "updatedAt": "2023-02-13T15:36:41.222Z",
  "deletedAt": null
}
```
We can get the list of bookmarks

```sh
GET: 
http://localhost:5000/api/v1/bookmark
```

Even with pagination

```sh
GET: 
http://localhost:5000/api/v1/bookmark?page=1&limit=5
```

If the user do not give the page and limit as the parameter.  
System will get the page default at 1 and limit at 10.  


```sh
Result:
{
  "totalPage": 1,
  "currentPage": 1,
  "data": [
    {
      "id": "d1e4ba1b-9eca-494d-bfff-853deaee0ee2",
      "title": "Báo Mới - Tin tức mới nhất cập nhật liên tục 24H",
      "url": "https://baomoi.com/",
      "image": "https://baomoi-static.bmcdn.me/web/styles/img/facebook-thumb.png",
      "description": "Báo Mới - Trang tin tự động ...",
      "createdAt": "2023-02-13T15:41:17.947Z",
      "deletedAt": null
    },
    {
      "id": "d1ff3a26-adfb-44b4-b390-5d4f8d5e1b9e",
      "title": "VnExpress - Báo tiếng Việt nhiều người xem nhất",
      "url": "https://vnexpress.net/",
      "image": "https://s1.vnecdn.net/vnexpress/restruct/i/v738/logo_default.jpg",
      "description": "VnExpress tin tức mới nhất - Thông tin nhanh ...",
      "createdAt": "2023-02-13T15:41:29.819Z",
      "updatedAt": "2023-02-13T15:41:29.819Z",
      "deletedAt": null
    }
  ]
}
```

User can get a specify bookmark by it ID as the parameter:

```sh
GET: 
http://localhost:5000/api/v1/bookmark/{id}

Result:
{
  "id": "d1ff3a26-adfb-44b4-b390-5d4f8d5e1b9e",
  "title": "VnExpress - Báo tiếng Việt nhiều người xem nhất",
  "url": "https://vnexpress.net/",
  "image": "https://s1.vnecdn.net/vnexpress/restruct/i/v738/logo_default.jpg",
  "description": "VnExpress tin tức mới nhất - Thông tin nhanh ...",
  "createdAt": "2023-02-13T15:41:29.819Z",
  "updatedAt": "2023-02-13T15:41:29.819Z",
  "deletedAt": null
}
```

User can update a bookmark title, description and cover image by it ID

```sh
PATCH: 
http://localhost:5000/api/v1/bookmark

Request Body:
{
  "id": "efed0642-49c1-45e9-b121-de97586741c6",
  "title": "News Paper",
  "description": "Read News paper today",
  "image": "https://s1.vnecdn.net/vnexpress/restruct/i/v738/logo_default.jpg"
}

Result:
{
  "id": "efed0642-49c1-45e9-b121-de97586741c6",
  "title": "News Paper",
  "url": "https://vnexpress.net/",
  "image": "https://s1.vnecdn.net/vnexpress/restruct/i/v738/logo_default.jpg",
  "description": "Read News paper today",
  "createdAt": "2023-02-13T16:01:27.812Z",
  "updatedAt": "2023-02-13T16:06:12.126Z",
  "deletedAt": null
}
```

*Note

```sh
We can only update bookmarks that are not in the trash area!
```

User can move a bookmark to the trash area:

```sh
DELETE: 
http://localhost:5000/api/v1/bookmark/{id}

Result:
Bookmark has been deleted. You can recover it within 3 minutes.
```

*Note:

```sh
- If the bookmark is in the trash area for more than 3 minutes, it can not be restored (permanently deleted).
- Bookmark in the trash area has a timestamp `deletedAt`.  
- If the bookmark is restored then `deletedAt = null`. 
```

User can see the list of bookmark which is in the trash area.
This one has pagination too.

```sh
GET: 
http://localhost:5000/api/v1/bookmark/deleted?page=1&limit=5

Result: 
{
  "totalPage": 1,
  "currentPage": 1,
  "data": [
    {
      "id": "d1e4ba1b-9eca-494d-bfff-853deaee0ee2",
      "title": "Báo Mới - Tin tức mới nhất cập nhật liên tục 24H",
      "url": "https://baomoi.com/",
      "image": "https://baomoi-static.bmcdn.me/web/styles/img/facebook-thumb.png",
      "description": "Báo Mới - Trang tin tự động ...",
      "createdAt": "2023-02-13T15:41:17.947Z",
      "updatedAt": "2023-02-13T15:41:17.947Z",
      "deletedAt": "2023-02-13T15:50:11.030Z"
    }
  ]
}
```

 
We can restore bookmark with this API

```sh
PATCH:
http://localhost:5000/api/v1/bookmark/restore/{id}

Result: 
Bookmark has been restored.
```

If the bookmark has been deleted

```sh
Result: 
{
  "status": 400,
  "message": "Can not restore bookmark. Your bookmark is permanently deleted!"
}
```