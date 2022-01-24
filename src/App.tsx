import React, {useEffect, useState} from 'react';
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

function App() {
    /*
    0   1
      U
    3   2

    4   5
      D
    7   6
     */

    const MOVE_INFO = [
        [ // 0 UBL
            {name: "UB", nextId: 1},
            {name: "UL", nextId: 3},
            {name: "BL", nextId: 7},
        ],
        [ // 1 UBR
            {name: "UB", nextId: 0},
            {name: "UR", nextId: 2},
            {name: "BR", nextId: 6},
        ],
        [ // 2 UFR
            {name: "UF", nextId: 3},
            {name: "UR", nextId: 1},
            {name: "FR", nextId: 5},
        ],
        [ // 3 UFL
            {name: "UF", nextId: 2},
            {name: "UL", nextId: 0},
            {name: "FL", nextId: 4},
        ],
        [ // 4 DFL
            {name: "DF", nextId: 5},
            {name: "DL", nextId: 7},
            {name: "FL", nextId: 3},
        ],
        [ // 5 DFR
            {name: "DF", nextId: 4},
            {name: "DR", nextId: 6},
            {name: "FR", nextId: 2},
        ],
        [ // 6 DBR
            {name: "DB", nextId: 7},
            {name: "DR", nextId: 5},
            {name: "BR", nextId: 1},
        ],
        [ // 7 DBL
            {name: "DB", nextId: 6},
            {name: "DL", nextId: 4},
            {name: "BL", nextId: 0},
        ],
    ]

    const scrambleLength = 50
    const [scrambleText, setScrambleText] = useState("")

    useEffect(() => {
        setScrambleText(makeScramble(scrambleLength))
        document.addEventListener("keyup", handleKeyDown, false)
    }, [])

    const makeScramble = (length: number): string => {
        let scrambleList = []
        const firstId = 2

        let beforeId = firstId
        let nextItem = MOVE_INFO[firstId][Math.floor(Math.random() * 3)]
        let currentId = nextItem.nextId
        let nextId = 0
        scrambleList.push(nextItem.name)

        for (let i = 0; i < length - 1; i++) {
            do {
                nextItem = MOVE_INFO[currentId][Math.floor(Math.random() * 3)]
                nextId = nextItem.nextId
            } while (beforeId === nextId)
            beforeId = currentId
            currentId = nextId
            scrambleList.push(nextItem.name)
        }
        return scrambleList.join(" ")
    }

    const handleButtonClick = () => {
        setScrambleText(makeScramble(scrambleLength))
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.code
        if (key === "Space") {
            setScrambleText(makeScramble(scrambleLength))
        }
    }

    return (
        <Box
            sx={{
                margin: '0 auto',
                padding: '20px',
                maxWidth: '700px'
            }}>
            <Typography
                variant={"h4"}
                sx={{
                    paddingBottom: '50px'
                }}>ルービック3Dスライド スクランブラー</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant={"body1"}>
                                    スクランブル
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant={"h6"}>{scrambleText}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button
                                    variant={"contained"}
                                    onClick={handleButtonClick}
                                >次のスクランブル</Button>
                                <Typography variant={"body2"} sx={{paddingTop: '10px'}}>
                                    or スペースキーでスクランブル更新
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant={"body1"} sx={{paddingTop: '20px'}}>
                                    回転記号について<br/>
                                    <br/>
                                    回転記号はエッジパーツと連動しています。<br/>
                                    UFエッジを含む辺をスライドさせる回転記号が「UF」になります。
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default App;
