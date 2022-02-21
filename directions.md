# Skills Test

Congratulations and thank you for making it this far in the interview process!

As it should have been described to you, the following is a multi-part skills test designed to reflect real-world Guardians' projects. We appreciate and value your time and we hope this test will not waste it.

## How you will be evaluated

We are evaluating the following competencies: design expertise, valid html, css/scss best practices, vue knowledge, and js coding.

There are five parts to this test, **but not all parts of the test need to be completed in order to advance in the interview process.** We mostly want to see your strengths and weaknesses.

## DIRECTIONS

1. If you haven't already, create a CodeSandbox account.
2. Click on the menu icon in the top left and go to File and click Fork Sandbox --- Or just click the Fork button in the top right.
3. Continue with the directions below.

When you are done, there is a form link in the initial email you recieved. Fill out the questions, which should include urls to your forked sandbox (and your forked github repo if you do Part IV). Give a brief explanation of how it went and what challenges (if any) you faced. Also let us know roughly how long it took for you to complete the challenge. Speed is not what we are evaluating; we are evaluating the process as a whole and the effort it takes to complete it.

Good luck!

### PART I

We are building a pitcher assessment page. Another developer started this project but can't finish it, so we need you to take it over. There is a service that returns a list of pitchers and we need to be able to show a single pitcher's info on this page. There's already some general placeholder info and components created that you should use.

We also want to show pitch plots for all of the pitcher's pitches as well as indiviual plots for each different pitch type (i.e. one plot has all pitches plotted, the next plot has fastballs, another plot has curveballs, etc.).

**When you are finished, we should have a nicely designed and formatted beginning of a pitcher assessment page along with plotted data.**

**Endpoint documentation is at the end of this document**

### PART II

Now that we have a pitcher assessment page, we need an intuitive way for users to load in other pitchers' data. The users will need access to all of the available pitchers.

**We need you to design and build some intuitive way for users to select different pitchers to assess.**

### PART III

Our pitching director told us that our coaches need a way to see each pitch's data individually. In the past, we put this kind of data into a table for easier readability. The coaches also want the ability to interact with a pitch on the plot to see it highlight on the table as well as the reverse; they want to be able to interact with a row in the table and see a highlight on the corresponding plotted pitch.

**What we need you to do is create a table with all the pitcher's pitches and have it interact with the pitch plots.**

### PART IV

Up to this point, we provided you with the end points to get what you need. Now we would like to see how you would create an endpoint and how you would handle its events. Your endpoints should return the exact data as the provided ones.

**Please replace the provided endpoints with your own, following the directions in the README file found in the link below.**

https://github.com/Cle-Engineers/cle-be-challenge

## Provided Endpoint Documentation For PARTS I-III

# `/players`

https://cle-fe-challenge-services.vercel.app/api/players

https://cle-fe-challenge-services.vercel.app/api/players?playerId=105859

#### Query Params

`playerId` - optional

#### Description

If no query param is passed, returns a list of playerOverviews

```js
// return object
{
  players: [];
}
```

If a playerId is passed, returns detailed playerDetails

```js
// return object
{
  playerDetails: {
  }
}
```

# `/pitches`

https://cle-fe-challenge-services.vercel.app/api/pitches?playerId=105859

#### Query Params

`playerId` - required

#### Description

Returns a list of pitches for the passed in playerId

```js
// return object
{
  pitches: [];
}
```
