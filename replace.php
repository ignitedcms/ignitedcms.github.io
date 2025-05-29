<!DOCTYPE html>
<html>
<head>
    <title>HTML File String Replacer</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        textarea { width: 100%; height: 150px; margin: 10px 0; }
        .result { margin-top: 20px; padding: 10px; background: #f0f0f0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>HTML File String Replacer</h1>
        <form method="post">
            <div>
                <label for="directory">Directory Path:</label><br>
                <input value="/Users/user/Documents/herd/ignitedcms.github.io" type="text" name="directory" id="directory" style="width: 100%;" required>
            </div>
            <div>
                <label for="original">Original String:</label><br>
                <textarea name="original" id="original" required></textarea>
            </div>
            <div>
                <label for="replacement">Replacement String:</label><br>
                <textarea name="replacement" id="replacement" required></textarea>
            </div>
            <input type="submit" value="Replace Strings" name="submit">
        </form>

        <?php
        if (isset($_POST['submit'])) {
            $directory = rtrim($_POST['directory'], '/');
            $original = $_POST['original'];
            $replacement = $_POST['replacement'];
            $results = [];

            // Validate directory
            if (!is_dir($directory)) {
                echo "<div class='result'>Error: Invalid directory path</div>";
                exit;
            }

            // Get all HTML files
            $files = glob($directory . '/*.html');

            if (empty($files)) {
                echo "<div class='result'>No HTML files found in the specified directory.</div>";
                exit;
            }

            // Process each file
            foreach ($files as $file) {
                $content = file_get_contents($file);

                if ($content === false) {
                    $results[] = "Error reading file: " . basename($file);
                    continue;
                }

                // Create pattern that matches across multiple lines
                $pattern = preg_quote($original, '/');
                // Replace newlines in the pattern with \s* to match any whitespace
                $pattern = str_replace(["\r\n", "\n", "\r"], '\s*', $pattern);
                // Replace spaces with \s* to match any whitespace
                $pattern = str_replace(' ', '\s*', $pattern);
                // Add modifiers: i=case insensitive, s=dot matches newline, m=multiline mode
                $pattern = '/(' . $pattern . ')/ism';

                // Perform replacement using preg_replace
                $newContent = preg_replace($pattern, $replacement, $content);

                // Write new content directly to file
                if (file_put_contents($file, $newContent) === false) {
                    $results[] = "Error writing to file: " . basename($file);
                } else {
                    $results[] = "Successfully processed: " . basename($file);
                }
            }

            // Display results
            echo "<div class='result'>";
            echo "<h3>Results:</h3>";
            echo "<ul>";
            foreach ($results as $result) {
                echo "<li>" . htmlspecialchars($result) . "</li>";
            }
            echo "</ul>";
            echo "</div>";
        }
        ?>
    </div>
</body>
</html>
