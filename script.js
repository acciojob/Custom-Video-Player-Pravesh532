document.addEventListener("DOMContentLoaded", function () {
    const player = document.querySelector(".player");
    const video = player.querySelector(".viewer");
    const progress = player.querySelector(".progress");
    const progressBar = player.querySelector(".progress__filled");
    const toggle = player.querySelector(".toggle");
    const skipButtons = player.querySelectorAll("[data-skip]");
    const ranges = player.querySelectorAll(".player__slider");

    // Toggle Play/Pause
    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function updateButton() {
        const icon = video.paused ? "►" : "❚ ❚";
        toggle.textContent = icon;
    }

    // Update Progress Bar
    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    // Skip Forward/Backward
    function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
    }

    // Handle Range Updates
    function handleRangeUpdate() {
        video[this.name] = this.value;
    }

    // Event Listeners
    video.addEventListener("click", togglePlay);
    video.addEventListener("play", updateButton);
    video.addEventListener("pause", updateButton);
    video.addEventListener("timeupdate", handleProgress);

    toggle.addEventListener("click", togglePlay);
    skipButtons.forEach((button) => button.addEventListener("click", skip));
    ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
    ranges.forEach((range) => range.addEventListener("mousemove", handleRangeUpdate));

    let mousedown = false;
    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    progress.addEventListener("mousedown", () => (mousedown = true));
    progress.addEventListener("mouseup", () => (mousedown = false));
});
