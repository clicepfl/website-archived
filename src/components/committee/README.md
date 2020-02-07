# Committee component documentation

## Modifying the committee list

This is a simple guide to modify the committee list (wherever used on the website).

Simply modify `committee-list.json` in this folder, which contains an array of object literals for each committee member. Each member must be of the following form, case-sensitive and separated by commas:

```json
 {
     "name": "John Doe",
     "role": "Démonstrateur d'exemple",
     "imageURL": "/committee/johndoe.jpg",
     "websiteURL": "https://people.epfl.ch/john.doe"
 }
```

- the `name` property is a string with the member's full firstname and surname
- the `role` property is a string with the member's role within the association
- the `imageURL` property is a string with the absolute remote url to the image
    - images must be located inside the local `assets` folder of this component: the corresponding absolute remote url is the image name inside prepended with `/committee/` (example: image `johndoe.jpg` placed locally in `assets/` will have `imageURL` set to `/committee/johndoe.jpg`)
    - if no image is available for this member, you can use `/committee/default.jpg`
- the `websiteURL` property is a string with the URL to the EPFL people page of the member

## Developer notes

The component is defined by 3 additional files:

- [`committee-router.ts`](committee-router.ts) mounts the local `assets` folder into the top-level router and assigns their URLs
- [`committee-view.njk`](committee-view.njk) contains view components definitions to display the committee, such as the grid view.
- [`committee.ts`](committee.ts) contains the internal representation of a committee member (type `Staff`) and the reusable `CommitteeComponent` definition