# Committee component documentation

This is the committee component, you are in folder `src/components/committee/`.

## Modifying the committee list

This is a simple guide to modify the committee list (wherever used on the website).

1. Fork this repository to your account using the `Fork` button in the top right corner of this page on Github

2. Clone your fork to your computer.

    ```
    cd ~/Documents
    git clone <YOUR_FORK_URL>
    ```

    where `<YOUR_FORK_URL>` is for instance `https://github.com/<username>/clic-website.git`

3. Open your favorite code editor, navigate to this folder (`src/components/committee/`) and modify [`committee-list.json`](committee-list.json), which contains an array of object literals for each committee member. Each member must be of the following form, case-sensitive and separated by commas:

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
    - images must be located inside the local `assets` folder in this component's folder: the corresponding absolute remote url is the image name inside prepended with `/committee/` (example: image `johndoe.jpg` placed locally in `assets/` will have `imageURL` set to `/committee/johndoe.jpg`)
    - if no image is available for this member, you can use `/committee/default.jpg`
- the `websiteURL` property is a string with the URL to the EPFL people page of the member

4. Test your changes if you want to
    - you will need NodeJS installed, [https://nodejs.org/](https://nodejs.org/)
    - navigate to the root of the repository and compile the software
        ```
        cd ~/Documents/clic-website/
        npm install && npm start
        ```
    - you can then access your changes locally at [http://localhost:8000](http://localhost:8000)
    - refer to the [top-level README](/README.md) for issues troubleshooting

5. Commit and push your changes **in this folder only** to your fork

    ```
    cd ~/Documents/clic-website/
    cd src/components/committee/
    git add .
    git commit -m "Update committe list"
    git push -v origin master
    ```

    Please do not commit any other files outside of this component's folder (the above commands do the job).

6. Create a new pull request and let the developers merge the update into the master branch
    1. Go to the [Pull Requests page](https://github.com/clicepfl/clic-website/pulls)
    2. Select `New pull request`
    3. Select `Compare across forks`
    4. Select your fork as `head repository` and compare `master`
    5. Have a last look at your changes and hit `Create pull request`

## Developer notes

The component is defined by 3 additional files:

- [`committee-router.ts`](committee-router.ts) mounts the local `assets` folder into the top-level router and assigns their URLs
- [`committee-view.njk`](committee-view.njk) contains view components definitions to display the committee, such as the grid view.
- [`committee.ts`](committee.ts) contains the internal representation of a committee member (type `Staff`) and the reusable `CommitteeComponent` definition