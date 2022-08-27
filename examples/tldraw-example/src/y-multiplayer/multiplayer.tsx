/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tldraw, useFileSystem } from '@tldraw/tldraw'
import * as React from 'react'
import { useMultiplayerState } from "./useMultiplayerState";

const roomId = 'mp-test-8'

/*
This example shows how to integrate TLDraw with a multiplayer room
via LiveBlocks. You could use any other service instead—the important
part is to get data from the Tldraw app when its document changes 
and update it when the server's synchronized document changes.

Warning: Keeping images enabled for multiplayer applications
without providing a storage bucket based solution will cause
massive base64 string to be written to the multiplayer storage.
It's recommended to use a storage bucket based solution, such as
Amazon AWS S3. See the www project for our implementation.
*/

export function YMultiplayer() {
  return (
    // <RoomProvider id={roomId}>
      <Editor roomId={roomId} />
    // </RoomProvider>
  )
}

function Editor({ roomId }: { roomId: string }) {
//   const { error, ...events } = useMultiplayerState(roomId)
//   if (error) return <div>Error: {error.message}</div>
    const fileSystemEvents = useFileSystem();
    const { onMount, ...events } = useMultiplayerState(roomId);


  return (
    <div className="tldraw">
      <Tldraw
        showPages={false}
        autofocus={true}
        // {...events}
        disableAssets={true}
        // disableAssets={false}
        // onAssetCreate={async (file: File, id: string) => {
        //   const url = await uploadToStorage(file, id)
        //   return url
        // }}
        // onAssetDelete={async (id: string) => {
        //   await delteFromStorage(id)
        //   return
        // }}/>
        onMount={onMount}
        {...fileSystemEvents}
        {...events}        
      />
    </div>
  )
}
