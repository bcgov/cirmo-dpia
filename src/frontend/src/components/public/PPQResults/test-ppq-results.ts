import { faSlidersH, faHandsHelping, faFileSignature, faFileDownload } from "@fortawesome/free-solid-svg-icons";

const ppqTestResults = [
  {
    id: 1,
    icon: faSlidersH,
    title: "Complexity",
    text: "Your initiative is likely medium complexity.",
    button: false
  },
  {
    id: 2,
    icon: faHandsHelping,
    title: "Collaborators",
    text: "In drafting your PIA, you may want to connect with:\n\nMinistry Privacy Officer (MPO)\n\n Ministry Information Security Officer (MISO)",
    button: false
  },
  {
    id: 3,
    icon: faFileSignature,
    title: "Template",
    text: "Your initiative is likely medium complexity.",
    button: true,
    buttonText: "Download",
    buttonIcon: faFileDownload
  }
]

export default ppqTestResults;