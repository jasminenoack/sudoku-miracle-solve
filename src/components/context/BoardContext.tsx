import React, {ReactNode, useState} from 'react';
import {beginnerPuzzle1} from "../../puzzle-data/beginner-puzzles";
import {AbstractProcedure} from "../procedures/models/ProcedureInterface";
import {Board, BoardHelpers} from "./models/board";

export const boardDataDefault = {
    currentPuzzle: [],
    selectedCell: undefined,
    setSelectedCell: (index: number | undefined) => {},

}

interface BoardContext {
    currentPuzzle: Board;
    selectedCell: number | undefined;
    setSelectedCell: (index: number | undefined) => void;
}

export const BoardContext = React.createContext<BoardContext>(boardDataDefault);

export function BoardContextProvider({children}: {children: ReactNode}) {
    const [currentPuzzle, setCurrentPuzzle] = useState<Board>(BoardHelpers.buildBoard(beginnerPuzzle1))
    const [runningProcedure, setRunningProcedure] = useState<undefined | AbstractProcedure>(undefined)
    const [selectedCell, setSelectedCell] = useState<undefined | number>(undefined)
    const [updateForStepChange, setUpdateForStepChange] = useState<boolean>(false)
    const context = {
        currentPuzzle,
        setCurrentPuzzle,
        runningProcedure,
        setRunningProcedure,
        selectedCell,
        setSelectedCell,
        updateForStepChange,
        setUpdateForStepChange,
    }
    return (
        <BoardContext.Provider value={context}>
            <div>
                {children}
            </div>
        </BoardContext.Provider>
    )
}


// export const themes = {
//   light: {
//     foreground: '#000000',
//     background: '#eeeeee',
//   },
//   dark: {
//     foreground: '#ffffff',
//     background: '#222222',
//   },
// };
//
// export const ThemeContext = React.createContext(
//   themes.dark // default value
// );
//
// // //////////////////////////////////////////////////////////
//
// import {ThemeContext} from './theme-context';
//
// class ThemedButton extends React.Component {
//   render() {
//     let props = this.props;
//     let theme = this.context;
//     return (
//       <button
//         {...props}
//         style={{backgroundColor: theme.background}}
//       />
//     );
//   }
// }
// ThemedButton.contextType = ThemeContext;
//
// export default ThemedButton;
//
//
// import {ThemeContext, themes} from './theme-context';
// import ThemedButton from './themed-button';
//
// // An intermediate component that uses the ThemedButton
// function Toolbar(props) {
//   return (
//     <ThemedButton onClick={props.changeTheme}>
//       Change Theme
//     </ThemedButton>
//   );
// }
//
// // //////////////////////////////////////////////////////////
//
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       theme: themes.light,
//     };
//
//     this.toggleTheme = () => {
//       this.setState(state => ({
//         theme:
//           state.theme === themes.dark
//             ? themes.light
//             : themes.dark,
//       }));
//     };
//   }
//
//   render() {
//     // The ThemedButton button inside the ThemeProvider
//     // uses the theme from state while the one outside uses
//     // the default dark theme
//     return (
//       <Page>
//         <ThemeContext.Provider value={this.state.theme}>
//           <Toolbar changeTheme={this.toggleTheme} />
//         </ThemeContext.Provider>
//         <Section>
//           <ThemedButton />
//         </Section>
//       </Page>
//     );
//   }
// }
//
// const root = ReactDOM.createRoot(
//   document.getElementById('root')
// );
// root.render(<App />);