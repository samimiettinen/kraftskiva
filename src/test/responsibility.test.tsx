import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Responsibility, { responsibility } from "@/components/songbook/Responsibility";
import SpotifyPlayer from "@/components/game/SpotifyPlayer";
afterEach(cleanup);
describe("responsibility and privacy", () => {
  it("preserves the supplied attribution and accessible logo", () => {
    render(<BrowserRouter><Responsibility/></BrowserRouter>);
    expect(screen.getByText(responsibility)).toBeInTheDocument();
    expect(screen.getByRole("img", {name:"Helsingin Nuorkauppakamari"})).toBeInTheDocument();
    expect(screen.getByRole("link",{name:"Tietosuoja"})).toHaveAttribute("href","/tietosuoja");
    expect(screen.getByRole("link",{name:"Virheet ja poistopyynnöt"})).toHaveAttribute("href","/yhteydenotto");
  });
  it("loads no Spotify iframe until approval and removes it on withdrawal", () => {
    const app=render(<SpotifyPlayer trackId="example"/>);
    expect(app.container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:"Hyväksy ja lataa Spotify-soitin"}));
    expect(screen.getByTitle("Spotify-melodiasoitin")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:"Sulje Spotify-soitin"}));
    expect(app.container.querySelector("iframe")).toBeNull();
  });
});
