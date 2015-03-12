module.exports = function(grunt, data) {

  return {

    seleniumWatch: {
      cwd: "build",
      command: "java -jar selenium-server-standalone-2.43.0.jar",
      stdout: true,
      stderror: true
    }
  };
}