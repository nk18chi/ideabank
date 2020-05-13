import React, { Fragment } from "react";
import "./App.css";
import { Button, Switch } from "@material-ui/core/";

const App: React.FC = () => {
  var seenWords: Set<string> = new Set();
  const words: string[] = [
    "Telephone",
    "Movie",
    "Coding",
    "Music",
    "Engineer",
    "Memo",
    "Video",
    "Short message",
    "Short Video",
    "Communication",
    "Dating",
    "Restaurant",
    "Taxi",
    "Food",
    "Hotel",
    "Online",
    "Storage",
    "Subscription",
    "Chat",
    "Cloud",
    "Share",
    "Friend",
    "Rating",
    "C2C",
    "Delivery",
    "Booking",
    "Internet",
    "Log",
    "anywhere",
    "Connection",
    "Cheap",
    "Telphone",
    "AI",
    "Recommendation",
    "Book",
    "Fashion",
    "Social Network",
    "Computer Enginner",
    "Camera",
    "Picture",
    "Schedule",
    "Dictionary",
    "Bookmark",
    "Comment",
    "Discussion",
    "Translation",
    "News",
    "Realtime",
    "Message",
    "Map",
    "Weather",
    "Partner",
    "Family",
    "Cooking",
    "Secret",
    "Private",
    "Public",
    "Study",
    "Measure",
    "Appliance",
    "3D",
    "Virtual",
    "Drone",
    "Porn",
    "Manga",
    "Account",
    "Bank",
    "Lawyer",
    "Accountant",
    "Doctor",
    "Artist",
    "Game",
    "Auction",
    "Flea market",
    "Wallet",
    "Mail",
    "Calendar",
    "Reminder",
    "Home",
    "Remote",
    "Exercise",
    "Hair cut",
    "Beauty",
    "Cosmetic",
    "Cryptocurrency",
    "Currency",
    "History",
    "Quiz",
    "Expensive",
    "Lagujuary",
    "Radio",
    "Newspaper",
    "Alerm",
    "Notification",
    "Record",
    "Audio",
    "Travel",
    "Event",
    "Tool",
    "Language",
    "Transportation",
    "Advertisement",
    "Free",
    "Relax",
    "Compare",
    "Election",
    "Adult",
    "Child",
    "Baby",
    "Abroad",
    "School",
    "Student",
    "Senior",
    "Young",
    "Country",
    "Introduction",
    "Health",
    "Library",
    "Sport",
    "Broadcast",
    "Exam",
    "Analysis",
    "Interview",
    "Job",
    "Insurance",
    "location",
    "Competition",
    "Entertaiment",
    "Flight",
    "Driver",
    "BtoC",
    "Magazine",
    "Relationship",
    "Teaching",
    "Teacher",
    "Photo",
    "Studio",
    "Recipe",
    "Contract",
    "Employment",
    "Guidance",
    "Priority",
    "Suggestion",
    "Charity",
    "Donation",
    "Feedback",
    "Singer",
    "Athlete",
    "Clothes",
    "Drawing",
    "Poem",
    "Wedding",
    "Funeral",
    "Platform",
    "Pets",
    "Review",
    "Code",
    "International",
    "Survey",
    "Scan",
    "Security",
    "Television",
    "Letter",
    "Live viewing",
    "Coaching",
    "Retro",
    "Education",
    "Grobal",
  ];
  const [threeWords, setThreeWords] = React.useState<string[]>([getWord(), getWord(), getWord()]);
  const wordRefs = React.useRef<any>([React.useRef(), React.useRef(), React.useRef()]);
  const [isFixedSwitch, setIsFixedSwitch] = React.useState([false, false, false]);

  const typingIntervalRef = React.useRef<any>();
  const cursorIntervalRef = React.useRef<any>();
  const [typingRefs, settypingRefs] = React.useState<any[]>([React.useRef(), React.useRef(), React.useRef()]);
  const [typingTextArr, settypingTextArr] = React.useState<string[]>(["", "", ""]);
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isCursor, setIsCursor] = React.useState(true);

  const typingTextData = [
    "Let's think creatively!",
    "Come up with a new idea by combining the following three words.",
    "ex.) 📞Telephone　✖️ 🎵Music　✖️ 🌍Internet　= 📱iPhone",
  ];

  React.useEffect(() => {
    if (isCursor) {
      cursorIntervalRef.current = setInterval(() => {
        let newRefs = typingRefs;
        let curColor = newRefs[count].current.style.borderColor;
        newRefs[count].current.style.borderColor = curColor === "black" ? "white" : "black";
        settypingRefs(newRefs);
      }, 200);
    }
    return () => {
      clearInterval(cursorIntervalRef.current);
    };
  }, [count, isCursor, typingRefs]);

  React.useEffect(() => {
    typingIntervalRef.current = settypingTextArr(typingTextArr);
  }, [typingTextArr]);

  React.useEffect(() => {
    if (count < typingTextData.length) {
      if (index < typingTextData[count].length) {
        typingIntervalRef.current = setInterval(() => {
          let newTextArr: string[] = typingTextArr;
          newTextArr[count] += typingTextData[count][index];
          settypingTextArr(newTextArr);
          setIndex(index + 1);
        }, 40);
      } else {
        setIndex(0);
        typingRefs[count].current.style.borderColor = "white";
        setCount(count + 1);
      }
    } else {
      setIsCursor(false);
    }
    return () => {
      clearInterval(typingIntervalRef.current);
    };
  }, [count, index, typingRefs, typingTextArr, typingTextData]);

  function getWord(): string {
    var i: number = Math.floor(Math.random() * words.length);
    while (seenWords.has(words[i])) {
      i = Math.floor(Math.random() * words.length);
    }
    seenWords.add(words[i]);
    return words[i];
  }

  function resetWords(e: any) {
    Promise.all(
      wordRefs.current.map(async (ref: any, i: number) => {
        if (isFixedSwitch[i]) {
          return;
        }
        return await changeWordStyle(ref);
      })
    ).then((results) => {
      results.forEach((result) => {
        if (result !== "success") {
          console.error("shuffle words error...");
          return;
        }
      });
      for (var i = 0; i < threeWords.length; i++) {
        if (isFixedSwitch[i]) {
          continue;
        }
        seenWords.delete(threeWords[i]);
      }
      let newThreeWords = [...threeWords];
      newThreeWords.map((w: any, i: number) => {
        if (isFixedSwitch[i]) {
          return w;
        } else {
          return getWord();
        }
      });
      setThreeWords([...newThreeWords]);
    });
  }

  async function changeWordStyle(ref: any) {
    ref.current.style.transform = "translateY(-100%)";
    ref.current.style.opacity = 0;
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        ref.current.style.transitionDuration = "0s";
        ref.current.style.transform = "translateY(100%)";

        setTimeout(() => {
          ref.current.style.transitionDuration = "0.3s";
          ref.current.style.transform = "translateY(0)";
          ref.current.style.opacity = 1;
          try {
            resolve("success");
          } catch (err) {
            reject(err);
          }
        }, 20);
      }, 250);
    });
  }

  const handleSwitchChange = (num: number) => {
    let newFixedSwitch = isFixedSwitch;
    newFixedSwitch[num] = !newFixedSwitch[num];
    setIsFixedSwitch([...newFixedSwitch]);
  };

  return (
    <div className='App'>
      <header>
        <h1>Idea Bank</h1>
      </header>
      <article>
        {typingTextArr.map((t: string, i: number) => (
          <div key={i}>
            {i === 0 ? (
              <h2 ref={typingRefs[i]}>{t}</h2>
            ) : (
              <p ref={typingRefs[i]} className='description'>
                {t}
              </p>
            )}
          </div>
        ))}
        <ul className='three-elements-container slot-words'>
          {threeWords.length > 0 &&
            threeWords.map((word: string, i: number) => (
              <Fragment key={i}>
                <li className='slot-word-li'>
                  <p ref={wordRefs.current[i]}>{word}</p>
                </li>
                {i < threeWords.length - 1 && (
                  <li className='middle-li'>
                    <p>×</p>
                  </li>
                )}
              </Fragment>
            ))}
        </ul>
        <ul className='three-elements-container switch-controller'>
          {isFixedSwitch.map((sc: any, i: number) => (
            <Fragment key={i}>
              <li>
                <Switch key={i} color='primary' checked={sc} onChange={() => handleSwitchChange(i)} />
              </li>
              {i < isFixedSwitch.length - 1 && (
                <li className='middle-li white'>
                  <p>×</p>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
        <Button className='shuffle-btn' variant='contained' color='primary' onClick={resetWords}>
          Shuffle
        </Button>
      </article>
      <footer>2020 © ideabank-1887f.web.app All Rights Reserved.</footer>
    </div>
  );
};

export default App;
